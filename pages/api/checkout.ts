import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import { NextApiRequest, NextApiResponse } from "next"
import Razorpay from 'razorpay'
import Booking from "../../types/Booking";
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
});
const handler = withApiAuthRequired(async(req:NextApiRequest,res:NextApiResponse) => {
    if(req.method === 'POST'){
        try{
            const details = req.body as Booking
            let order = await generateRazorpay(details)
            res.status(200).json(order)
        }catch(err){
            res.status(200).json({ error:'Error occured please try again!!!!' })
        }
    }else{
        res.status(200).json({ error:'please use correct method' })
    }
})
const generateRazorpay = async (details : Booking) => {
    return new Promise<any>((resolve,reject)=>{
        const options = {
            amount: details.total*100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
          };
          instance.orders.create(options, function(err:any, order:any) {
              if(err){
                  console.log(err)
                  throw new Error(err)
              }
              resolve(order)
            });
    })
}

export default handler