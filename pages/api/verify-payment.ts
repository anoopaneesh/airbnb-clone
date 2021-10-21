import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import { NextApiRequest, NextApiResponse } from "next"
import collections from "../../utils/collections"
import { connectToDatabase } from "../../utils/mongodb"

const handler = withApiAuthRequired(async(req:NextApiRequest,res:NextApiResponse)=>{
    if(req.method === 'POST'){
        const {db} = await connectToDatabase()
        const body = req.body
        const booking = req.body.booking
        booking.razorpay_payment_id = req.body.response.razorpay_payment_id
        booking.razorpay_order_id = req.body.response.razorpay_order_id
        booking.razorpay_signature = req.body.response.razorpay_signature
        booking.created_at = new Date().toISOString()
        let res_db = await db.collection(collections.BOOKINGS).insertOne(booking)
        res.status(200).json({status:'success',message:'Booking completed'})
    }else{
        res.status(200).json({status:'error',message:'Please use correct method'})
    }
})

export default handler