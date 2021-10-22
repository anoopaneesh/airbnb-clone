import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getBookings } from "../../helpers/bookingHelper";
import collections from "../../utils/collections";
import { connectToDatabase } from "../../utils/mongodb";
const handler = withApiAuthRequired(async(req:NextApiRequest,res:NextApiResponse) => {
    if(req.method === 'POST'){
        const body = req.body
    const {db} = await connectToDatabase()
    try{
        const result = await db.collection(collections.BOOKINGS).deleteOne({_id:new ObjectId(body.id),user_id:body.user})
        const bookings = await getBookings(body.user)
        res.status(200).json({status:'success',message:'Successfully deleted',bookings})
    }catch(err){
        res.status(200).json({status:'error',message:'Some error occured'})
    }
    }else{
        res.status(200).json({status:'error',message:'use correct method'})
    }
})


export default handler