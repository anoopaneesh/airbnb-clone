import Image from 'next/image'
import hero from '../images/hero.png'
const Banner = () => {
    return (
        <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
            <Image src={hero} alt="hero" layout="fill" objectFit="cover" />
            <div className="absolute top-1/2 w-full text-center">
                <h1 className="font-bold">Not sure where to go ? Perfect.</h1>
                <button className="bg-white text-purple-500 p-5 rounded-full shadow-md mt-5 font-bold hover:shadow-lg active:scale-90 transition duration-150">I'm flexible</button>
            </div>
        </div>
    )
}

export default Banner
