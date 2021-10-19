import fb from "../images/fb.png";
import twitter from "../images/twitter.png";
import insta from "../images/insta.png";
import Image from "next/image";
const Footer = () => {
  return (
    <footer className=" bg-gray-100 px-8 sm:px-16 md:px-32 py-14">
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-y-10 ">
        <div className="text-gray-800 text-sm space-y-4">
          <h5 className="font-bold">ABOUT</h5>
          <p>How Airbnb works</p>
          <p>Newsroom</p>
          <p>Airbnb 2021</p>
          <p>Investors</p>
        </div>
        <div className="text-gray-800 text-sm space-y-4">
          <h5 className="font-bold">COMMUNITY</h5>
          <p> Diversity & Belonging</p>
          <p> Accessibility</p>
          <p>Airbnb Associates</p>
          <p>Guest Referrals</p>
          <p>Airbnb.org</p>
        </div>
        <div className="text-gray-800 text-sm space-y-4">
          <h5 className="font-bold">HOST</h5>
          <p>Host your home </p>
          <p>Host an Online Experience </p>
          <p>Host an Experience</p>
          <p>Responsible hosting </p>
          <p>Resource Centre </p>
          <p>Community Centre</p>
        </div>
        <div className="text-gray-800 text-sm space-y-4">
          <h5 className="font-bold">SUPPORT </h5>
          <p>Our COVID-19 Response </p>
          <p>Help Centre</p>
          <p> Cancellation options</p>
          <p>Neighbourhood Support</p>
          <p>Trust & Safety</p>
        </div>
      </div>
      <hr className="my-14 w-full"></hr>
      <div className="flex justify-between items-center md:flex-row flex-col">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-2 whitespace-nowrap text-center">
          <p>© 2021 Anoop, Inc.</p>
          <p>Privacy</p>
          <p>Terms</p>
          <p>Sitemap</p>
          <p>Company details</p>
        </div>
        <div className="flex space-x-4 items-center mt-5">
          <div className="h-6 w-6 relative">
            <Image src={fb} layout="fill" />
          </div>
          <div className="h-6 w-6 relative">
            <Image src={insta} layout="fill" />
          </div>
          <div className="h-6 w-6 relative">
            <Image src={twitter} layout="fill" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
