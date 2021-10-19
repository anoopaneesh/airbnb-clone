import { useState } from 'react';
import ReactMapGL, { Marker, ViewportProps } from 'react-map-gl';  
import { Hotel } from '../data/hotelsData';
interface MapProps{
    searchResults : Hotel[]
}
interface Coordinate{
    latitude:number,
    longitude:number
}
const getCenter = (props : Coordinate[]) => {
    let tLat = 0;
    let tLon = 0;
    props.map((i)=>{
        tLat+=i.latitude
        tLon+=i.longitude
    })
    return {
        latitude:tLat/props.length,
        longitude:tLon/props.length
    }
}
const Map = ({searchResults}:MapProps) => {
    const coordinates = searchResults.map(item => ({
        latitude: item.lat,
        longitude: item.lon,
    }))
    const center = getCenter(coordinates)
    const [viewport, setViewport] = useState<ViewportProps | any>({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11
      });
    return (
        <ReactMapGL 
        mapStyle="mapbox://styles/anooppk/ckuxjhxjcpcs617prvv3dv1em"
        mapboxApiAccessToken={process.env.mapbox_key}
        {...viewport}
        onViewportChange = {(nextViewport:ViewportProps) => setViewport(nextViewport)}
        >
            {searchResults.map(item => (
                <div key={item.id}>
                <Marker
                 longitude={Number(item.lon)}
                 latitude={Number(item.lat)}
                 offsetLeft={-20}
                 offsetTop={-10}
                >
                    <p className="cursor-pointer animate-bounce">📌</p>
                </Marker>
            </div>
            ))}
            </ReactMapGL>
    )
}

export default Map
