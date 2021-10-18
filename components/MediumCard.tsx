import Image from 'next/image'
interface MediumCardProps{
    title:string
    image:string
}
const MediumCard = ({title,image}:MediumCardProps) => {
    return (
        <div className="mt-8 cursor-pointer hover:scale-105 transition transform duration-200 ease-out">
            <div className="relative w-80 h-80 overflow-hidden rounded-xl">
                <Image src={image} layout="fill" />
            </div>
            <h3 className="text-xl font-semibold mt-2">{title}</h3>
        </div>
    )
}

export default MediumCard
