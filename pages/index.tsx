import { GetServerSideProps } from "next"
import Banner from "../components/Banner"
import BigCard from "../components/BigCard"
import Footer from "../components/Footer"
import Header from "../components/Header"
import MediumCard from "../components/MediumCard"
import SmallCard from "../components/SmallCard"
import big from '../images/big.png'
interface IndexProps{
  exploreData : Explore[]
  liveData:Live[]
}
interface Live{
  title:string
  image:string
}
interface Explore{
  place:string
  image:string
  distance:string
}

const index = ({exploreData,liveData} : IndexProps) => {
  return (
    <div>
      <Header />
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
        <section>
          <h2 className="text-3xl font-bold">Live Anywhere</h2>
          <div className="flex space-x-4 overflow-scroll scrollbar-hide p-3 -ml-3">
            {liveData.map(({image,title}) => (
              <MediumCard key={title} title={title} image={image} />
            ))}
          </div>
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

export const getServerSideProps : GetServerSideProps = async(context) => {
  let {exploreData,liveData} = await fetch('http://localhost:3000/api/home').then(res => res.json())

  return {
    props:{
      exploreData,
      liveData
    }
  }
}