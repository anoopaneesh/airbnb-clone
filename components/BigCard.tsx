import Image from 'next/image'
interface BigCardProps{
    title:string
    subtitle:string
    image:any
    btnText:string
}
const BigCard = ({btnText,image,title,subtitle}:BigCardProps) => {
    return (
        <div className="relative h-[300px] my-10 cursor-pointer">
            <Image src={image} layout="fill" objectFit="cover" className="rounded-xl"/>
            <div className="flex flex-col space-y-2 absolute text-white  w-52 top-10 left-10">
            <h1 className="font-semibold text-3xl">{title}</h1>
            <p className="text-sm">{subtitle}</p>
            <button className="px-4 py-2 text-black bg-white rounded-md">{btnText}</button>
            </div>
        </div>
    )
}

export default BigCard
