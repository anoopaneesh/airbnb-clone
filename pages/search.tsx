import { format } from "date-fns";
import { GetServerSideProps } from "next";
import hotelsData, { Hotel } from "../data/hotelsData";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SearchCard from "../components/SearchCard";
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
      <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`}/>

      <main className="flex">
        <section className="flex-grow mt-10 px-8 md:px-10">
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
          <div>
            {hotels.map(hotel => (
              <SearchCard key={hotel.id} hotel={hotel}/>  
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default search;

export const getServerSideProps : GetServerSideProps = async(context) => {
    
    return {
        props:{
          query:context.query,
          hotels:hotelsData
        }
    }
}
