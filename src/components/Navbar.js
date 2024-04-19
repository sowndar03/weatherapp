  import React, { useState } from "react";
  import { CiLocationOn } from "react-icons/ci";
  import { AsyncPaginate } from "react-select-async-paginate";
  import { GEO_API_URL, geoApiOptions } from "../api";

  const Navbar = ({ handleSearchChange,  location, handleFetchWeather, setLocation}) => {
    const [search, setSearch] = useState(null);


    const handleSubmit = () => {
      if (location && location.lat && location.lon) {
        const { lat, lon } = location;
        handleFetchWeather({ lat, lon });
        setLocation({
          lat,
          lon
        });
      } else {
        console.error("Location information is not available.");
      }
    };
      
    const loadOptions = (inputValue) => {
      return fetch(
        `${GEO_API_URL}/cities?minpopulation=1000&namePrefix=${inputValue}`,
        geoApiOptions
      )
        .then((response) => response.json())
        .then((response) => {
          return {
            options: response.data.map((city) => {
              return {
                value: `${city.latitude}  ${city.longitude}`,
                label: `${city.name} ${city.countryCode}`,
              };
            }),
          };
        })
        .catch((error) => console.log(error));
    };

    const handleChange = (e) => {
      setSearch(null);
      handleSearchChange(e);
    };

    return (
      <div className="bg-blue-100 flex  flex-col md:flex-row justify-center p-3 gap-3 font-serif">
        <div className="flex  w-full md:w-2/6 relative border-md rounded-md">
          <AsyncPaginate
            debounceTimeout={600}
            value={search}
            onChange={handleChange}
            loadOptions={loadOptions}
            placeholder="Search your cities"
            className="w-full p-1 outline-none border-none border-opacity-20 border-transparent rounded-xl text-black text-base "
          />
        </div>
        <div className="flex items-center justify-center border-2 bg-blue-500 border-none rounded-xl">
          <CiLocationOn className="text-white size-7 mr-1" />

          <button>
            <p className="border-opacity-20 rounded-md text-base text-white p-2 cursor-pointer" onClick={handleSubmit}>
              Your Location Weather
            </p>
          </button>
        </div>
      </div>
    );
  };

  export default Navbar;
