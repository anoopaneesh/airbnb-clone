import collections from "../utils/collections"
import { connectToDatabase } from "../utils/mongodb"


export const getBookings = async(id:string) => {
    const {db} = await connectToDatabase()
    const bookings = await db.collection(collections.BOOKINGS).aggregate([
        {$match:{user_id:id}},
        { $addFields: { "hotel_id": { "$toObjectId": "$hotel_id" }}},
        {            
            $lookup:
              {
                from: collections.HOTELS,
                localField: "hotel_id",
                foreignField: "_id",
                as: "hotel"
              }
        },
        {$addFields:
                {
                    "hotel": { $arrayElemAt: [ "$hotel", 0 ] }
                }
        }
         
    ]).toArray()
    return bookings
}