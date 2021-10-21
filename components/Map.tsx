import { useState } from "react";
import Image from 'next/image'
import ReactMapGL, { Marker, Popup, ViewportProps } from "react-map-gl";
import  Hotel  from "../types/Hotels";
import { StarIcon } from "@heroicons/react/solid";
interface MapProps {
  searchResults: Hotel[];
}
interface Coordinate {
  latitude: number;
  longitude: number;
}
const getCenter = (props: Coordinate[]) => {
  let tLat = 0;
  let tLon = 0;
  props.map((i) => {
    tLat += i.latitude;
    tLon += i.longitude;
  });
  return {
    latitude: tLat / props.length,
    longitude: tLon / props.length,
  };
};
const Map = ({ searchResults }: MapProps) => {
  const coordinates = searchResults.map((item) => ({
    latitude: item.lat,
    longitude: item.lon,
  }));
  const center = getCenter(coordinates);
  const [selectedPin, setSelectedPin] = useState<any>({});
  const [viewport, setViewport] = useState<ViewportProps | any>({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });
  return (
    <ReactMapGL
      mapStyle="mapbox://styles/anooppk/ckuy2psh28tpy18qvvyso89bb"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport: ViewportProps) =>
        setViewport(nextViewport)
      }
    >
      {searchResults.map((item) => (
        <div key={item._id} onClick={() => setSelectedPin(item)}>
          <Marker
            longitude={Number(item.lon)}
            latitude={Number(item.lat)}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <div className=" cursor-pointer p-2 rounded-full bg-white border-2">
              <p className="font-bold">{item.ratePerMonth}</p>
            </div>
            
          </Marker>
          {selectedPin && selectedPin.id === item._id ? (
              <Popup
                closeOnClick={true}
                closeButton={false}
                onClose={() => setSelectedPin(null)}
                latitude={Number(selectedPin.lat)}
                longitude={Number(selectedPin.lon)}
              >
                <div className="w-60 h-64 scale-110 bg-white rounded-lg overflow-hidden">
                    <div className="w-full h-40 relative">
                    <Image src={selectedPin.thumbnail} layout="fill" objectFit="cover"/>
                    </div>
                    <div className="px-2 py-1">
                        <p className="text-xs text-gray-500">{selectedPin.place}</p>
                        <h1 className="text-sm">{selectedPin.title}</h1>
                        <div className="flex items-center mt-2">
                        <StarIcon className="text-red-400 h-5" />
                        <p className="text-xs">{selectedPin.rating || '-'}</p>
                        </div>
                    </div>
                </div>
              </Popup>
            ) : (
              <></>
            )}
        </div>
      ))}
    </ReactMapGL>
  );
};

export default Map;
