import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req:NextApiRequest,res:NextApiResponse) {
    res.redirect('https://www.google.com')
}