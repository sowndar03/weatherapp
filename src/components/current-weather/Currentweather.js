import React from "react";
import { TbRefresh } from "react-icons/tb";
import { IoSunnyOutline } from 'react-icons/io5';
import { BsCloudMoon } from 'react-icons/bs';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'

const icon = L.icon({
  iconUrl: './loc.png',
  iconSize: [38,38],
})

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Currentweather = ({ cdata, fdata, latitude, longitude }) => {
  console.log(cdata)
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek).concat(WEEK_DAYS.slice(0, dayInAWeek));

      return (
    <div>
      <div className="flex m-4 mt-8 flex-col gap-4 items-center md:flex-row lg:flex-row xl:flex-row">
        <div className="border-2 p-8 w-full md:w-5/6 lg:w-1/2 xl:w-1/3 flex flex-col items-center rounded-3xl relative shadow-lg shadow-grey-300 ">
          <p className="text-blue-500 text-2xl  font-bold">{cdata.name}</p>
          <p className="text-6xl  text-blue-500 font-bold">
            {Math.round(cdata.main.temp)}&deg;C
          </p>
          <p className="text-2xl  text-blue-500 font-semibold">
            {cdata.weather[0].description}
          </p>
          <TbRefresh className="absolute right-4 top-4 size-8 text-blue-500" />
        </div>
        <div className="w-full lg:w-1/2 xl:w-1/3 m-1">
          <table className="border-collapse w-full rounded-3xl shadow-lg shadow-grey-300">
            <tbody>
              <tr>
                <td className="p-2 text-xl text-blue-500 font-semibold">
                  Feel Temp.
                </td>
                <td className="p-2 bg-blue-500 text-xl text-white font-semibold ">
                  {Math.round(cdata.main.temp)}&deg;C
                </td>
              </tr>
              <tr>
                <td className="p-2 text-xl text-blue-500 font-semibold">
                  Humidity
                </td>
                <td className="p-2 bg-blue-500 text-xl text-white font-semibold ">
                  {cdata.main.humidity}
                </td>
              </tr>
              <tr>
                <td className="p-2 text-xl text-blue-500 font-semibold">
                  Wind
                </td>
                <td className="p-2 bg-blue-500 text-xl text-white font-semibold ">
                  {cdata.wind.speed}Km/hr
                </td>
              </tr>
              <tr>
                <td className="p-2 text-xl text-blue-500 font-semibold">
                  Visibility
                </td>
                <td className="p-2 bg-blue-500 text-xl text-white font-semibold ">
                  {cdata.visibility}
                </td>
              </tr>
              <tr>
                <td className="p-2 text-xl text-blue-500 font-semibold">
                  Max Temp.
                </td>
                <td className="p-2 bg-blue-500 text-xl text-white font-semibold ">
                  {Math.round(cdata.main.temp_max)}&deg;C
                </td>
              </tr>
              <tr>
                <td className="p-2 text-xl text-blue-500 font-semibold">
                  Min Temp.
                </td>
                <td className="p-2 bg-blue-500 text-xl text-white font-semibold ">
                  {Math.round(cdata.main.temp_min)}&deg;C
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="rounded-md border-2 w-full sm:w-1/2 h-60" >
        <MapContainer  key={`${latitude}-${longitude}`} center={[latitude, longitude]} zoom={13}  style={{width: '100%' , height: '100%',  overflow: 'hidden'}}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[latitude, longitude]} icon={icon} >
            <Popup>
              {cdata.name}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
        
      </div>
      <div className="flex justify-center rounded-lg gap-4 p-4 m-2 flex-wrap">
      {fdata.list.slice(0, 7).map((item, idx) => (
        <div
          key={idx}
          className="border-2 rounded-md shadow-lg shadow-grey-500 p-4 items-center justify-center"
        >
          <div key={idx} className="flex items-center flex-col">
            <p className="border-2 bg-blue-500 rounded-lg p-3 text-white font-bold">
              {forecastDays[idx]}
            </p>
          </div>
          <div className="text-blue-500 font-semibold flex flex-col  items-center ">
            <p className="flex gap-2 items-center text-lg">
              <IoSunnyOutline />
              {Math.round(item.main.temp_max)}&deg;C
            </p>
            <p className="flex gap-2 items-center text-lg">
              <BsCloudMoon />
              {Math.round(item.main.temp_min)}&deg;C
            </p>
            <p className="text-lg">{item.weather[0].description}</p>
          </div>
        </div>
      ))}
    </div>
      
    </div>
  );
};

export default Currentweather;
