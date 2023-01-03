import { React, useEffect, useState } from "react";
import "./App.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// const covidIcon = new Icon({
//   iconUrl: icon1,
//   iconSize: [25, 25]
// })

function App() {
    const [active, setActive] = useState(null);
    const [details, setDetails] = useState([]);
    // let details = [];
    const country = [];
    const fetchData = async () => {
        const response = await fetch("http://localhost:8000/");
        const data = await response.json();

        data[0].map((userInfo) => {
            data[1].map((geoInfo) => {
                if (
                    userInfo.Year === "2016" &&
                    userInfo.Entity === geoInfo.country
                ) {
                    country.push([userInfo, geoInfo]);
                }
                return 0;

                // if (item.Year === "2016") {
                //     usage.push(item);
                // }
            });
            return 0;
        });
        setDetails(country);
        console.log(country);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <MapContainer
            center={[20.593683, 78.962883]}
            zoom={5}
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            />

            {details.map((eachData) => {
                return (
                    <Marker
                        key={eachData[0].Entity}
                        position={[eachData[1].latitude, eachData[1].longitude]}
                        eventHandlers={{
                            click: () => {
                                setActive(eachData);
                            },
                        }}
                        // icon= {covidIcon}
                    />
                );
            })}

            {active && (
                <Popup
                    position={[active[1].latitude, active[1].longitude]}
                    onClose={() => {
                        setActive(null);
                    }}
                >
                    <div>
                        <h1>{active[0].Entity}</h1>
                        <p>Data used by Individual: {active[0].Users}</p>
                    </div>
                </Popup>
            )}
        </MapContainer>
    );
}

export default App;
