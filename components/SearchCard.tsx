import Image from 'next/image'
import  Hotel  from '../types/Hotels'
import {HeartIcon} from '@heroicons/react/outline'
import {StarIcon} from '@heroicons/react/solid'
import { useRouter } from 'next/dist/client/router'
import { useUser } from '@auth0/nextjs-auth0'
interface SearchCardProps{
 hotel:Hotel
}
const SearchCard = ({hotel}:SearchCardProps) => {
    const {user} = useUser()
    const router = useRouter()
    const handleBookNow = () => {
        if(user){
            let oldQ = router.query
            router.push({
                pathname:'/checkout',
                query:{
                    id:hotel._id,
                    ...oldQ,
                }
            })
        }
    }
    const {bathrooms,place,title,bedrooms,beds,features,guests,_id,ratePerMonth,rating,thumbnail} = hotel
    return (
        <div className="flex space-x-2 w-full p-2 pr-4 my-2 hover:bg-gray-100 cursor-pointer rounded-xl shadow-sm hover:shadow-md transition transform duration-200 ease-out">
            {/* Left */}
            <div className="relative hidden sm:inline-flex sm:w-72 h-48 ">
                <Image src={thumbnail} layout="fill" objectFit="cover" className="rounded-lg"/>
            </div>
            {/* Right */}
            <div className="flex-grow flex flex-col">
                {/* Top */}
                <div className="flex items-center justify-between space-x-2">
                    <div className="">
                        <p className="text-sm text-gray-500">{place}</p>
                        <h1 className="text-lg">{title}</h1>
                    </div>
                    <HeartIcon className="h-8"/>
                </div>
                {/* Middle */}
                <div className="border-t-2 w-12 my-1"></div>
                <div>
                    <p className="text-gray-500">{`${guests} guests . ${bedrooms} bedrooms . ${beds} beds . ${bathrooms} bathrooms`}</p>
                </div>
                {/* Bottom */}
                <div className="flex-grow"></div>
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <StarIcon className="text-red-400 h-5" />
                    <p>{rating || '-'}</p>
                    </div>
                   <div>
                    <p>{`${ratePerMonth}`}<span className="text-gray-500">/ month</span></p>
                    {user && <button onClick={handleBookNow} className="p-2 rounded-md bg-red-400 hover:bg-red-300 text-white w-full mt-4">Book now</button>}
                   </div>
                </div>
            </div>
        </div>
    )
}

export default SearchCard
