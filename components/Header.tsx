import Image from "next/image";
import logo from "../images/airbnb.png";
import {SearchIcon,GlobeAltIcon,MenuIcon,UserCircleIcon} from '@heroicons/react/solid'
const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-10 grid grid-cols-3 p-5 md:px-10 items-center">
      {/* Left */}
      <div className="relative flex items-center h-10 cursor-pointer my-auto">
        <Image
          src={logo}
          alt="logo"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>
      {/* Middle Search */}
      <div className="flex items-center md:border-2 p-2 md:shadow-sm rounded-full">
          <input type="text" placeholder="Start your search" className="flex-grow text-gray-500 bg-transparent outline-none mx-2"/>
          <SearchIcon className="cursor-pointer hidden md:inline-flex h-8 p-2 bg-red-400 text-white rounded-full"/>
      </div>
      {/* Right */}
      <div className="text-gray-600 flex space-x-4 items-center justify-end">
          <h2 className="cursor-pointer hidden md:inline-flex">Become a host</h2>
          <GlobeAltIcon className="h-6 cursor-pointer" />
          <div className="flex items-center space-x-2 rounded-full border-2 p-2">
            <MenuIcon  className="h-6 cursor-pointer" />
            <UserCircleIcon  className="h-6 cursor-pointer" />
          </div>
      </div>
    </header>
  );
};

export default Header;
