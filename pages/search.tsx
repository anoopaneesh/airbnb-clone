import { format } from "date-fns";
import { connectToDatabase } from "../utils/mongodb";
import collections from "../utils/collections";
import { GetServerSideProps } from "next";
import Head from 'next/head'
import  Hotel  from "../types/Hotels";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SearchCard from "../components/SearchCard";
import Map from "../components/Map";
interface Query{
  location: string;
  startDate: string;
  endDate: string;
  noOfGuests: string;
}

interface SearchPageProps {
  query:Query
  hotels:Hotel[]
}
const search = ({query,hotels}:SearchPageProps) => {
  const {startDate,endDate,location,noOfGuests} = query
  const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
  const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
  const range = `${formattedStartDate} - ${formattedEndDate}`;
  return (
    <div>
      <Head><title>Search Results</title></Head>
      <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`} navbarState={true}/>

      <main className="flex max-h-screen pt-20">
        <section className="flex-grow mt-10 px-8 md:px-10 overflow-scroll scrollbar-hide">
          <p className="text-sm">
            300+ stays · {range} . {noOfGuests} Guests{" "}
          </p>
          <h1 className="text-3xl font-bold">Stays in {location}</h1>
          <div className="hidden md:flex space-x-2 my-5">
            <p className="filter-btn">Type of place</p>
            <p className="filter-btn">Price</p>
            <p className="filter-btn">Rooms and beds</p>
            <p className="filter-btn">More filters</p>
          </div>
          <div className="flex flex-col">
            {hotels.map(hotel => (
              <SearchCard key={hotel._id} hotel={hotel}/>  
            ))}
          </div>
        </section>
        <section className="hidden xl:inline-flex xl:min-w-[600px]">
          <Map searchResults={hotels}/>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default search;

export const getServerSideProps : GetServerSideProps = async(context) => {
    const {db} = await connectToDatabase()
    let hotelsData = await db.collection(collections.HOTELS).find().toArray()
    return {
        props:{
          query:context.query,
          hotels:JSON.parse(JSON.stringify(hotelsData))
        }
    }
}
