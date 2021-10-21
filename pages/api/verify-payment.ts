import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import { NextApiRequest, NextApiResponse } from "next"


const handler = withApiAuthRequired((req:NextApiRequest,res:NextApiResponse)=>{
    if(req.method === 'POST'){
        const body = req.body
        console.log('body',body)
        res.status(200).json({status:'success',message:'Everything went fine !!'})
    }else{
        res.status(200).json({status:'error',message:'Please use correct method'})
    }
})

export default handler