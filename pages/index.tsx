import { GetStaticProps } from "next"
import { connectToDatabase } from "../utils/mongodb"
import collections from "../utils/collections"
import  Explore  from "../types/Explore"
import Live from "../types/Live"
import Banner from "../components/Banner"
import BigCard from "../components/BigCard"
import Footer from "../components/Footer"
import Header from "../components/Header"
import MediumCard from "../components/MediumCard"
import SmallCard from "../components/SmallCard"
import big from '../images/big.png'
import { useEffect, useRef, useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid"
interface IndexProps{
  exploreData : Explore[]
  liveData:Live[]
}

const index = ({exploreData,liveData} : IndexProps) => {
  const [mediumContainerLeft,setMediumContainerLeft] = useState(0)
  const [navbarState,setNavbarState] = useState(false)
  const mediumRef = useRef<HTMLDivElement>(null)
  const scrollRight = () => {
    mediumRef.current?.scroll({
      left:500
    })

    mediumRef.current && setMediumContainerLeft(mediumRef.current.scrollLeft)
  }
  const scrollLeft = () => {
    mediumRef.current?.scroll({
      left:-500
    })
    mediumRef.current && setMediumContainerLeft(mediumRef.current.scrollLeft)
  }
  useEffect(()=>{
    const handleScroll = () => {
      if(window.scrollY > 2){
        setNavbarState(true)
      }else{
        setNavbarState(false)
      }
    }
    window.addEventListener('scroll',handleScroll)
    return ()=> window.removeEventListener('scroll',handleScroll)
  },[])
  return (
    <div>
      <Header navbarState={navbarState}/>
      <Banner />
      <main className="max-w-7xl mx-auto px-8 sm:px-10">
        <section className="my-10">
          <h2 className="text-3xl font-bold">Explore nearby</h2>
          <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {exploreData.map(({place,image,distance}) => (
            <SmallCard key={place} place={place} image={image} distance={distance} />
          ))}
          </div>
        </section>
        <section className="relative">
          <h2 className="text-3xl font-bold">Live Anywhere</h2>
          <div className="flex space-x-4 overflow-scroll scrollbar-hide p-3 -ml-3" ref={mediumRef}>
            {liveData.map(({image,title}) => (
              <MediumCard key={title} title={title} image={image} />
            ))}
  
          </div>
           <div onClick={scrollRight} className="hidden hover:shadow-xl md:inline-block cursor-pointer absolute right-0 translate-x-1/2 top-1/2 shadow-lg p-4 bg-gray-50 rounded-full ">
            <ChevronRightIcon className="h-6"/>
          </div>
          {mediumContainerLeft > 0 && <div onClick={scrollLeft} className="hidden hover:shadow-xl md:inline-block cursor-pointer absolute left-0 -translate-x-1/2 top-1/2 shadow-lg p-4 bg-gray-50 rounded-full ">
            <ChevronLeftIcon className="h-6"/>
          </div>}
        </section>
        <section>
          <BigCard title="Try hosting" subtitle="Earn extra income and unlock new opportunities by sharing your space" btnText="Learn more" image={big} />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default index

export const getStaticProps : GetStaticProps = async(context) => {
  const {db} = await connectToDatabase()
  const exploreData = await db.collection(collections.EXPLORE).find().toArray()
  const liveData = await db.collection(collections.LIVE_ANYWHERE).find().toArray()
  return {
    props:{
      exploreData:JSON.parse(JSON.stringify(exploreData)),
      liveData:JSON.parse(JSON.stringify(liveData)),
    }
  }
}