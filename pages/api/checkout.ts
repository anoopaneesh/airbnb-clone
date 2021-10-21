import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import { NextApiRequest, NextApiResponse } from "next"

const handler = withApiAuthRequired((req:NextApiRequest,res:NextApiResponse) => {
    if(req.method === 'POST'){
        console.log(req.body)
        res.status(200).json({ status:'success',message:'order placed successfully' })
    }else{
        res.status(200).json({ error:'please use correct method' })
    }
})


export default handler