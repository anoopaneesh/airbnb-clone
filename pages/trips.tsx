import Footer from "../components/Footer";
import Header from "../components/Header";
import Image from "next/image";
import trip from "../images/trip.svg";
import { useEffect, useState } from "react";
import {
  getSession,
  UserProfile,
  withPageAuthRequired,
} from "@auth0/nextjs-auth0";
import { CustomBooking } from "../types/Booking";
import { isBefore } from "date-fns";
import Trip from "../components/Trip";
import { getBookings } from "../helpers/bookingHelper";
interface Trips {
  bookings: CustomBooking[];
  user: UserProfile;
}
const trips = ({ bookings: current_bookings }: Trips) => {
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState(current_bookings);
  const [upcomming, setUpcomming] = useState<CustomBooking[]>([]);
  const [past, setPast] = useState<CustomBooking[]>([]);
  useEffect(() => {
    const up: CustomBooking[] = [];
    const pa: CustomBooking[] = [];
    bookings.map((book) => {
      let diff = isBefore(new Date(book.endDate), new Date());
      if (diff) {
        pa.push(book);
      } else {
        up.push(book);
      }
    });
    setUpcomming(up);
    setPast(pa);
  }, [bookings]);
  const handleCancel = async (id: string, user: string) => {
    setLoading(true);
    let data = await fetch("/api/cancel-booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        user,
      }),
    }).then((res) => res.json());
    if(data.bookings){
        setBookings(data.bookings)
    }
    setLoading(false);
  };
  return (
    <div>
      <Header navbarState={true} />
      <main className="max-w-7xl mx-auto px-8 lg:px-0 pt-32 pb-20">
        <h1 className="text-4xl font-bold my-5">Trips</h1>
        <section className="flex space-x-2 border-b">
          <h3
            onClick={() => setTab(0)}
            className={`p-4 font-semibold -ml-4 hover:bg-gray-100 cursor-pointer ${
              tab === 0 ? "text-black border-b-2 border-black" : "text-gray-600"
            }`}
          >
            Upcomming
          </h3>
          <h3
            onClick={() => setTab(1)}
            className={`p-4 font-semibold hover:bg-gray-100 cursor-pointer  ${
              tab === 1 ? "text-black border-b-2 border-black" : "text-gray-600"
            }`}
          >
            Past
          </h3>
        </section>
        <section className="mt-5">
          {tab === 0 ? (
            upcomming.length ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 xl:grid-cols-4">
                {upcomming.map((item) => (
                  <Trip
                    key={item._id}
                    trip={item}
                    cancelable={true}
                    loading={loading}
                    handleCancel={handleCancel}
                  />
                ))}
              </div>
            ) : (
              <div>
                <p className="text-gray-600">
                  When you’re ready to start planning your next trip, we’re here
                  to help.&nbsp;
                  <span className="underline text-gray-900 cursor-pointer">
                    Learn more
                  </span>
                </p>
                <div className="relative w-full h-96">
                  <Image src={trip} layout="fill" />
                </div>
                <button className="text-white font-bold px-8 py-2 bg-black rounded-lg">
                  Explore airbnb
                </button>
              </div>
            )
          ) : past.length ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 xl:grid-cols-4">
              {past.map((item) => (
                <Trip
                  key={item._id}
                  trip={item}
                  cancelable={false}
                  loading={loading}
                  handleCancel={handleCancel}
                />
              ))}
            </div>
          ) : (
            <div>
              <p className="text-gray-600">
                You don’t have any past trips yet – but when you do, you’ll find
                them here.
              </p>
              <div className="relative w-full h-96">
                <Image src={trip} layout="fill" />
              </div>
              <button className="text-white font-bold px-8 py-2 bg-black rounded-lg">
                Explore airbnb
              </button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default trips;

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (context) => {
    const session = getSession(context.req, context.res);
    if (!session) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    const bookings = await getBookings(session.user.sub);
    return {
      props: {
        bookings: JSON.parse(JSON.stringify(bookings)),
      },
    };
  },
});
