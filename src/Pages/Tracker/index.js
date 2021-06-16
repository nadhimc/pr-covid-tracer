import React, { useState } from 'react';
import { Link, useParams, Redirect } from 'react-router-dom';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

function Tracker(){

    // console.log(process.env.REACT_APP_APIBASEURL)

    const [maps, setMaps] = useState(false);
    const [ada, setAda] = useState(0);
    const [profile, setProfile] = useState({
        "person_id": "Loading...",
        "name": "Loading...",
        "gender": "Loading...",
        "age": "Loading...",
        "conditition": "Loading..."
    });

    let { id } = useParams();

    fetch(`${process.env.REACT_APP_APIBASEURL}/api/person?person_id=${id}`)
    .then(res=>res.json())
    .then(
        (result)=>{
            setProfile(result);
        }
    )

    const markers = [
        {
          coordinates: [123, 43]
        },
        {
          coordinates: [23, 70]
        },
      ];

    const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

    return(
        <div className="min-w-screen min-h-screen bg-gray-100 flex flex-col items-center pt-14 bg-gray-100 font-sans overflow-hidden">
            <h1 className="text-4xl mt-2 text-center mb-5 font-bold">Tracker</h1>
            <div>
                <Link to="/dashboard">
                    <button className="bg-red-400 hover:bg-red-600 rounded px-4 py-2 mb-3 text-white">
                        Back
                    </button>
                </Link>
            </div>
            <div className="flex justify-center w-full flex-wrap">
                <div className="bg-white py-6 px-6 rounded-3xl w-11/12 md:w-1/5 my-4 shadow-xl h-full">
                    <div className="mt-2">
                        <p className="text-xl font-semibold mt-2 mb-5">{profile.name}</p>
                        <p className="text-lg my-2">Age : {profile.age}</p>
                        <p className="text-lg my-2">Gender : {profile.gender}</p>
                        <p className="text-lg my-2">Condition : {profile.conditition}</p>
                        <div className="mt-7 flex justify-end">
                            <button onClick={()=>{setMaps(!maps)}} className="bg-green-600 hover:bg-green-800 rounded px-4 py-2 mb-3 text-white">
                                {maps?"Show Table":"Show Maps"}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="bg-white py-6 px-6 rounded-3xl w-11/12 md:w-3/5 ml-0 md:ml-3 my-4 shadow-xl h-full">
                    <div className={maps? "bg-white shadow-md rounded mb-6 overflow-x-auto hidden" : "bg-white shadow-md rounded mb-6 overflow-x-auto"}>
                        <table className="min-w-max w-full table-auto">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-center">No</th>
                                    <th className="py-3 px-6 text-center">Longitude</th>
                                    <th className="py-3 px-6 text-center">Latitude</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                <tr className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-center">1</td>
                                    <td className="py-3 px-6 text-center">120</td>
                                    <td className="py-3 px-6 text-center">300</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Maps */}
                    <div className={maps?"":"hidden"}>
                        <ComposableMap>
                            <Geographies geography={geoUrl} fill="#EAEAEC" stroke="#D6D6DA">
                                {({ geographies }) =>
                                geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />)
                                }
                            </Geographies>
                            {markers.map(({ name, coordinates, markerOffset }) => (
                                <Marker key={name} coordinates={coordinates}>
                                <g
                                    fill="none"
                                    stroke="#FF5533"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    transform="translate(-12, -24)"
                                >
                                    <circle cx="12" cy="10" r="3" />
                                    <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                                </g>
                                <text
                                    textAnchor="middle"
                                    y={markerOffset}
                                    style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
                                >
                                    {name}
                                </text>
                                </Marker>
                            ))}
                        </ComposableMap>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Tracker