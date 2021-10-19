import Image from 'next/image'
import hero from '../images/hero.png'
const Banner = () => {
    return (
        <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
            <Image src={hero} alt="hero" layout="fill" objectFit="cover" />
            <div className="absolute top-1/2 w-full text-center">
                <h1 className="font-bold  text-xl">Not sure where to go ? Perfect.</h1>
                <button className="bg-white text-lg text-purple-500 p-5 px-10 rounded-full shadow-md mt-5 font-bold hover:shadow-lg active:scale-90 transition duration-150">I'm flexible</button>
            </div>
        </div>
    )
}

export default Banner
