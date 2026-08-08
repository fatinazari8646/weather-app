// import React, { useEffect, useRef, useState } from "react";
// import "./Weather.css";
// import search_icon from "../assets/search.svg";
// import sun_icon from "../assets/86016.png";
// import smm_icon from "../assets/251011.jpg";
// import image_icon from "../assets/image.jpg";
// import images_icon from "../assets/images.jpg";

// const Weather = () => {
//   const inputRef = useRef();
//   const [weatherData, setWeatherData] = useState(false);
//   const allicons = {
//     "01d": sun_icon,
//     "01n": sun_icon,
//     "02d": image_icon,
//     "02n": image_icon,
//     "03d": smm_icon,
//     "03n": smm_icon,
//     "04d": images_icon,
//     "04n": images_icon,
//     "09d": image_icon,
//     "09n": image_icon,
//     "10d": image_icon,
//     "10n": image_icon,
//     "13d": smm_icon,
//     "13n": smm_icon,
//   };

//   const search = async () => {
//     if (city === "") {
//       alert("Enter City Name");
//       return;
//     }
//     try {
//       const url = `https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
//       const response = await fetch(url);
//       const data = await response.json();
//       if (!response.ok) {
//         alert(data.message);
//         return;
//       }
//       console.log(data);
//       const icon = allIcons[data.weather[0].icon] || clear_icon;
//       setWeatherData({
//         humidity: data.main.humidity,
//         windSpeed: data.wind.speed,
//         temperature: Math.floor(data.main.temp),
//         location: data.name,
//         icon: icon,
//       });
//     } catch (error) {}
//     setWeatherData(false);
//     console.error("Eeeor in fatching weather data");
//   };
//   useEffect(() => {
//     search("New York");
//   }, []);

//   return (
//     <div className="weather">
//       <div className="search-bar">
//         <input ref={inputRef} type="text" placeholder="Search" />
//         <img
//           src={search_icon}
//           alt=""
//           onClick={() => search(inputRef.current.value)}
//         />
//       </div>
//       {weatherData ? (
//         <>
//           <img src={weatherData.icon} alt="sun-icon" className="weather-icon" />
//           <p className="temperature">{weatherData.temperature}°c</p>
//           <p className="location">{weatherData.location}</p>
//           <div className="weather-data">
//             <div className="col">
//               <img src={smm_icon} alt="" />
//               <div>{weatherData.humidity} %</div>
//               <span>Humidity</span>
//             </div>
//           </div>
//           <div className="col">
//             <img src={image_icon} alt="" />
//             <div>{weatherData.windSpeed} Km/h</div>
//             <span>Wind Speed</span>
//           </div>
//         </>
//       ) : (
//         <></>
//       )}
//     </div>
//   );
// };

// export default Weather;

import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.svg";
import sun_icon from "../assets/86016.png";
import smm_icon from "../assets/251011.jpg";
import image_icon from "../assets/image.jpg";
import images_icon from "../assets/images.jpg";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);

  const allIcons = {
    "01d": sun_icon,
    "01n": sun_icon,
    "02d": image_icon,
    "02n": image_icon,
    "03d": smm_icon,
    "03n": smm_icon,
    "04d": images_icon,
    "04n": images_icon,
    "09d": image_icon,
    "09n": image_icon,
    "10d": image_icon,
    "10n": image_icon,
    "13d": smm_icon,
    "13n": smm_icon,
  };

  const search = async (city) => {
    if (!city || city.trim() === "") {
      alert("Enter City Name");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
        setWeatherData(null);
        return;
      }

      const data = await response.json();
      console.log(data);

      const icon = allIcons[data.weather[0].icon] || sun_icon;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      console.error("Error in fetching weather data:", error);
      setWeatherData(null);
      alert("Failed to fetch weather data. Please try again.");
    }
  };

  useEffect(() => {
    search("New York");
  }, []);

  const handleSearch = () => {
    const city = inputRef.current.value.trim();
    search(city);
  };

  return (
    <div className="weather">
      <div className="search-bar">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search"
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <img src={search_icon} alt="search" onClick={handleSearch} />
      </div>

      {weatherData ? (
        <>
          <img
            src={weatherData.icon}
            alt="weather-icon"
            className="weather-icon"
          />
          <p className="temperature">{weatherData.temperature}°c</p>
          <p className="location">{weatherData.location}</p>

          <div className="weather-data">
            <div className="col">
              <img src={smm_icon} alt="humidity" />
              <div>{weatherData.humidity} %</div>
              <span>Humidity</span>
            </div>

            <div className="col">
              <img src={image_icon} alt="wind" />
              <div>{weatherData.windSpeed} Km/h</div>
              <span>Wind Speed</span>
            </div>
          </div>
        </>
      ) : (
        <p className="loading">Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;
