import { GetServerSideProps } from "next"
import { useRouter } from "next/dist/client/router"
import Head from 'next/head'
import Image from 'next/image'
import Footer from "../components/Footer"
import Header from "../components/Header"
import img from '../images/completed.svg'
const completed = () => {
    const router = useRouter()
    return (
        <div>
            <Head>
                <title>Booking Completed</title>
            </Head>
            <Header navbarState={true} />
            <main className="py-5 pt-32 text-black text-center space-y-5 md:space-y-10">
                <h1 className="text-4xl md:text-7xl font-bold p-8">Booking completed successfully</h1>
                
                <div className="w-full h-[200px] md:h-[300px] lg:h-[400px] relative">
                    <Image src={img} layout="fill" />
                </div>
                <p className="text-2xl md:text-4xl">Thank you for using Creative World</p>
                <button onClick={()=>router.push('/')} className="px-4 py-2 bg-black text-white rounded-lg font-bold cursor-pointer hover:opacity-70">Explore Airbnb</button>
            </main>
            <Footer />
        </div>
    )
}

export default completed


export const getServerSideProps:GetServerSideProps = async(context) => {
    if(context.req.method !== 'POST'){
        return {
            redirect:{
                permanent:false,
                destination:"/"
            }
        }
    }
    return {
        props:{

        }
    }
}