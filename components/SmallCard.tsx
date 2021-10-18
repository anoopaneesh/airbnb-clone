import Image from 'next/image'
interface SmallCardProps {
  place: string;
  image: string;
  distance: string;
}
const SmallCard = ({ place, image, distance }: SmallCardProps) => {
  return (
    <div className="flex items-center space-x-4 mb-4 cursor-pointer bg-white hover:bg-gray-100 rounded-lg hover:scale-105 transition transform duration-200 ease-out mx-2">
      {/* Left */}
      <div className="relative w-16 h-16 rounded-md overflow-hidden">
          <Image src={image} layout="fill" />
      </div>
      {/* Right */}
      <div>
        <h1>{place}</h1>
        <p className="text-gray-500">{distance}</p>
      </div>
    </div>
  );
};

export default SmallCard;
