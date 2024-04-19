  import React, { useState } from "react";
  import Navbar from "./components/Navbar";
  import Currentweather from "./components/current-weather/Currentweather";
  import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";
  import { useEffect } from "react";
  import useGeoLocation from "./Hook/useGeoLocation";
  import Spinningcomponent from "./components/Spinningcomponent";

  const App = () => {
const [currentWeather, setCurrentWeather] = useState(null);
const [foreCast, setForeCast] = useState(null);
const [isloading, setIsLoading] = useState(true);
const [location, setLocation] = useState(null);
const [error, setError] = useState(null);
const { coordinates } = useGeoLocation();

    
    useEffect(() => {
      if (coordinates && coordinates.lat !== null && coordinates.lon !== null) {
        setLocation({ lat: coordinates.lat, lon: coordinates.lon });
        setError(null);
      } else {
        setError("Press the allow Button!");
      }
    }, [coordinates]);

    useEffect(() => {
      if (location !== null) {
        fetchWeather(location);
      }
    }, [location]);

    function fetchWeather({ lat, lon }) {
      const currentWeatherFetch = fetch(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const foreCastFetch = fetch(
        `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );

      Promise.all([currentWeatherFetch, foreCastFetch])
        .then(async (responses) => {
          const [weatherResponse, foreCastResponse] = await Promise.all(
            responses.map((res) => res.json())
          );
          setCurrentWeather({ ...weatherResponse });
          setForeCast({ ...foreCastResponse });
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }

    const handleSearchChange = (e) => {
      const [lat, lon] = e.value.split("  ");
      setLocation({
        lat,
        lon,
      });
    };

    return (
      <div>
        {error ? (
          <div>
            <h3 className="flex justify-center text-center align-center h-screen font-bold text-black text-2xl">
              {error}
            </h3>
          </div>
        ) : isloading ? (
          <Spinningcomponent />
        ) : (
          <>
            <Navbar
              handleSearchChange={handleSearchChange}
              cdata={currentWeather}
              location={location}
              handleFetchWeather={fetchWeather}
              setLocation={setLocation}
            
            />
            <Currentweather cdata={currentWeather} fdata={foreCast}  latitude = {location.lat} longitude = {location.lon} />
          </>
        )}
      </div>
    );
  };
  export default App;
