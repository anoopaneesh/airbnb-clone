// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import exploreData from '../../data/exploreData'
import liveData from '../../data/liveData'

type Explore = {
  place:string
  image:string
  distance:string
}
type Live = {
  title:string
  image:string
}
type Data = {
  exploreData:Explore[]
  liveData:Live[]
}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({exploreData,liveData})
}


