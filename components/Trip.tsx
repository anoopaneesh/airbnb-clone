import { CustomBooking } from "../types/Booking"
import Image from 'next/image'
import Head from 'next/head'
import { format } from "date-fns";
import currency from "currency.js";
import { useUser } from "@auth0/nextjs-auth0";
import { useState } from "react";
interface Trip{
    trip:CustomBooking
    cancelable:boolean
    handleCancel:any
    loading:boolean
}
const Trip = ({trip,cancelable,handleCancel,loading}:Trip) => {
    const {user} = useUser()
    const {place,title,thumbnail} = trip.hotel
    const formattedStartDate = format(new Date(trip.startDate), "dd MMMM yy");
    const formattedEndDate = format(new Date(trip.endDate), "dd MMMM yy");
    return (
        <div className="min-w-sm rounded-lg shadow-md overflow-hidden">
            <Head>
                <title>Trips | Airbnb clone</title>
            </Head>
            <div className="relative w-full h-40">
                <Image src={thumbnail} layout="fill" objectFit="cover" />
            </div>
            <div className="px-4 py-2 space-y-2">
            <h1 className="text-sm text-gray-800">{place}</h1>
            <h2 className="text-lg font-bold">{title}</h2>
            <div className="flex justify-between"><p className="text-sm font-bold">Checkin  :</p> <p>{formattedStartDate}</p></div>
            <div  className="flex justify-between"><p className="text-sm font-bold">Checkout :</p> <p>{formattedEndDate}</p></div>
            <div  className="flex justify-between"><p className="text-sm font-bold">Total :</p> <p>{currency(trip.total, { symbol:'₹',useVedic:true ,precision:0}).format()}</p></div>
            {cancelable && <div className="flex justify-end pb-2 pt-8">
            <button onClick={()=>handleCancel(trip._id,user?.sub)} className={`px-4 py-2 bg-red-700 text-white font-bold rounded-md  ${loading ? 'opacity-40 cursor-not-allowed':''}`}>
            Cancel Booking     
            </button>
            </div>}
            </div>
        </div>
    )
}

export default Trip
