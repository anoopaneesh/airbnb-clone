import Image from 'next/image'
import { connectToDatabase } from '../utils/mongodb'
import Head from 'next/head'
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0'
import Hotel from '../types/Hotels'
import { differenceInDays, format } from 'date-fns'
import { StarIcon } from '@heroicons/react/solid'
import currency from 'currency.js'
import collections from '../utils/collections'
import { ObjectId } from 'mongodb'
import Booking from '../types/Booking'
import RazorpayOrder from '../types/RazorpayOrder'
import razorpay from '../utils/razorpay'
interface CheckoutProps{
    hotel:Hotel
    startDate:string
    endDate:string
    noOfGuests:string
    callbackURL:string
}
const checkout = ({hotel,startDate,endDate,noOfGuests,callbackURL}:CheckoutProps) => {
    const {user} = useUser()
    const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
    const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
    let noOfDays = differenceInDays(new Date(endDate),new Date(startDate))
    noOfDays = noOfDays === 0 ? 1 : noOfDays
    const ratePerDay = currency(hotel.ratePerMonth).divide(28).value
    const rateForTotalDays  = currency(hotel.ratePerMonth).divide(28).multiply(noOfDays).value
    const totalINR = rateForTotalDays+390+622.05
    const handlePayment = async() => {
        const booking : Booking = {
            startDate,
            endDate,
            noOfDays,
            noOfGuests:Number(noOfGuests),
            user_id:user?.sub || "",
            hotel_id:hotel._id,
            total:Number(totalINR.toFixed(0))
        } 
        let response : RazorpayOrder = await fetch('/api/checkout',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(booking)
        }).then(res => res.json())
        
        const options = razorpay.getOptions({order:response,booking,user,callbackURL})
        const _window = window as any
        const rzp1 = new _window.Razorpay(options);
        rzp1.open()
    }
    return (
        <div>
            <Head>
                <title>Checkout</title>
                <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
            </Head>
            <Header  navbarState={true}/>
            <main className="max-w-7xl mx-auto px-8 pt-32 pb-10">
            <h1 className="text-3xl font-bold">Confirm Booking</h1>
                <div className="flex flex-col-reverse md:flex-row text-gray-900 space-y-8">
                <section className="flex-grow">
                    
                   <div className="space-y-5 mt-8">
                   <h1 className="text-xl font-bold">Your trip</h1>
                   <div ><h2 className="text-md font-semibold">Dates</h2>
                    <p>{formattedStartDate} ??? {formattedEndDate}</p></div>
                    <div><h2  className="text-md font-semibold">Guests</h2>
                    <p>{noOfGuests} guests</p></div>
                   </div>
                   <hr className="border-t-2 max-w-lg my-4" />
                   <div className=" space-y-4">
                   <h1 className="text-xl font-bold">Cancellation policy</h1>
<p className="max-w-md">Accommodation and service fee for the first 30 nights are non-refundable. Cancel before check-in and get back the cleaning fee, if you paid one. <span className="underline cursor-pointer">Learn more</span></p>
                   </div>
                   <button onClick={handlePayment} className="max-w-sm p-2 px-4 mt-5 hover:bg-red-300 bg-red-400 text-white rounded-md">Proceed to payment</button>
                </section>
                
                <section className="flex-grow border rounded-lg border-gray-300 p-8 max-w-md">
                    <div>
                        {/* Top */}
                        <div className="flex space-x-2">
                            {/* Left */}
                            <div className="relative w-36 h-32 hidden sm:inline-flex">
                                <Image src={hotel.thumbnail} layout="fill" className="rounded-lg"/>
                            </div>
                            {/* Right */}
                            <div className="flex flex-col space-y-2 text-sm">
                                <p>{hotel.place}</p>
                                <p>{hotel.title}</p>
                                <p>{hotel.beds} beds - {hotel.bathrooms} baths</p>
                                <div className="flex-grow"></div>
                                <div className="flex"><StarIcon  className="h-5 text-red-400"/><p className="font-semibold">{hotel.rating}</p></div>
                            </div>
                        </div>
                        <hr className="border-t-2 my-5"/>
                        {/* Bottom */}
                        <div className="flex flex-col space-y-4">
                        <h1 className="text-2xl font-bold">Price details</h1>
                        <div className="flex items-center justify-between">
                        <p>{currency(ratePerDay, { symbol:'???',useVedic:true ,precision:0}).format()} x {noOfDays} nights</p>	
                        <p>{currency(rateForTotalDays, { symbol:'???',useVedic:true ,precision:0}).format()}</p>
                        </div>
                        <div className="flex items-center justify-between">
                        <p>Cleaning fee</p>	
                        <p>???390</p>
                        </div>
                        <div className="flex items-center justify-between">
                        <p>Service fee</p>	
                        <p>???622.05</p>
                        </div>
                        <div className="flex items-center justify-between">
                        <p className="font-bold">Total (INR)	</p>
                        <p className="font-bold">{currency(totalINR, { symbol:'???',useVedic:true ,precision:0}).format()}</p>	
                        </div>  
                        </div>
                    </div>
                </section>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default checkout

export const getServerSideProps = withPageAuthRequired({
    getServerSideProps:async (context) => {
        const {db} = await connectToDatabase()
        const id = context.query.id as string
        if(!id){
            return {
                redirect:{
                    permanent:false,
                    destination:'/'
                }
            }
        }
        const data = await db.collection(collections.HOTELS).findOne({_id:new ObjectId(id)})
        if(!data){
            return {
                redirect:{
                    permanent:false,
                    destination:'/'
                }
            }
        }

        return {
            props:{
                hotel:JSON.parse(JSON.stringify(data)),
                startDate:context.query.startDate,
                endDate:context.query.endDate,
                noOfGuests:context.query.noOfGuests,
                callbackURL:process.env.BASE_URL+'/completed'
            }
        }
    } 
}) 