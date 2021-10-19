import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../images/airbnb.png";
import logoWhite from "../images/airbnb-white.png";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange, DateRangePicker } from "react-date-range";
import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UserGroupIcon
} from "@heroicons/react/solid";
import { useRouter } from "next/dist/client/router";
interface HeaderProps{
  placeholder?:string
  navbarState?:boolean
}
const Header = ({placeholder,navbarState}:HeaderProps) => {
  const router = useRouter()
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noOfGuests,setNoOfGuests] = useState(1)
  const selectionRange = {
    startDate,
    endDate,
    key: "selection",
  };
  const handleSelect = (ranges: any) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };
  const resetInput = () => {
    setSearchInput("")
  }
  const search = () => {
    router.push({
      pathname:'/search',
      query:{
        location:searchInput,
        startDate:startDate.toISOString(),
        endDate:endDate.toISOString(),
        noOfGuests
      }
    })
  }
  
  return (
    <header className={navbarState ? 'navbar' : 'navbar-active'}>
      {/* Left */}
      <div onClick={()=>{router.push('/')}} className="relative flex items-center h-8 cursor-pointer my-auto">
        <Image
          src={navbarState ? logo : logoWhite}
          alt="logo"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>
      {/* Middle Search */}
      <div></div>
      <div className={`search ${!navbarState ? 'translate-y-14 md:translate-y-16 w-1/2' : 'translate-y-0'}`}>
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          type="text"
          placeholder={placeholder || "Start your search"}
          className="w-full md:flex-grow text-gray-500 bg-transparent outline-none mx-2"
        />
       <div onClick={search} className="cursor-pointer hidden md:inline-flex p-2 bg-red-400 text-white rounded-full items-center space-x-2">
          
          <SearchIcon className="h-5" />
          {!navbarState && <p>Search</p>}
         </div>
         
      </div>
      {searchInput && (
        <div className={`calender ${navbarState ? 'translate-y-0' : 'translate-y-14' }`}>
          <div className="hidden sm:inline-flex">
            <DateRangePicker
              ranges={[selectionRange]}
              onChange={handleSelect}
              minDate={new Date()}
              rangeColors={["#FF585D"]}
            />
          </div>
          <div className="sm:hidden">
            <DateRange
              ranges={[selectionRange]}
              onChange={handleSelect}
              minDate={new Date()}
              rangeColors={["#FF585D"]}
            />
          </div>
          <div className="flex items-center">
            <h1 className="text-xl font-bold flex-grow">Number of guests</h1>
            <UserGroupIcon className="h-5"/>
            <input value={noOfGuests} onChange={(e)=>setNoOfGuests(Number(e.target.value))} className="w-12 outline-none p-2 text-red-400" type="number" />
          </div>
          <div className="flex mt-5">
            <button className="flex-grow text-gray-500" onClick={resetInput}>Cancel</button>
            <button className="flex-grow text-red-400" onClick={search}>Search</button>
          </div>
        </div>
      )}
      {/* Right */}
      <div className="text-gray-600 flex space-x-4 items-center justify-end">
        <h2 className={`cursor-pointer hidden md:inline-flex ${navbarState ? 'text-black' : 'text-white'}`}>Become a host</h2>
        <GlobeAltIcon className={`h-6 cursor-pointer ${navbarState ? 'text-black' : 'text-white'}`} />
        <div className="bg-white flex items-center space-x-2 rounded-full border-2 p-2">
          <MenuIcon className="h-6 cursor-pointer" />
          <UserCircleIcon className="h-6 cursor-pointer" />
        </div>
      </div>
      {/* Calender */}
      
    </header>
  );
};

export default Header;
