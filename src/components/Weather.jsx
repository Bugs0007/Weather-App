import React, { useEffect, useRef, useState,  } from 'react';
import clear from '../assets/clear.png';
import cloud from '../assets/cloud.png';
import drizzle from '../assets/drizzle.png';
import humidity from '../assets/humidity.png';
import rain from '../assets/rain.png';
import search_image from '../assets/search_image.png';
import snow from '../assets/snow.png';
import wind from '../assets/wind.png';
import './Weather.css';


const Weather = () => {

    const inputRef = useRef();
    const[weatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d": clear,
        "01n": clear,
        "02d": cloud,
        "02n": cloud,
        "03n": cloud,
        "04d": drizzle,
        "04n": drizzle,
        "09n": rain,
        "09d": rain,
        "10d": rain,
        "10n": rain,
        "13d": snow,
        "13n": snow,
    }

    const search = async (city) => {
        if (city === "") {
            alert("Enter City Name");
            return;
        }
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                alert(data.message); 
                return;
            }
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        } catch (error) {
            setWeatherData(false);
            console.error("Error fetching weather data")
        }
    }

    useEffect(() => {
        search("New Delhi")
    },[])

  return (
    <div className='weather'>
        <div className='search-bar'>
              <input ref={inputRef} type="text" placeholder='Enter City Name' />
              <img src={search_image} alt="search" onClick={() => search(inputRef.current.value)} />
          </div>
          {weatherData ? <>
            <img src={weatherData.icon} alt="" className='weather-icon' />
            <p className='temperature'>{weatherData.temperature}°C</p>
            <p className='location'>{weatherData.location}</p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidity} alt=""/>
                    <div>
                        <p>{weatherData.humidity}%</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={wind} alt=""/>
                    <div>
                        <p>{weatherData.windSpeed} Km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
          </> : <></>}
    </div>
  )
}

export default Weather