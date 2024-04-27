import { useEffect, useState } from "react";
import "./Weather.css";
import searchLogo from "./assets/search.svg";
import weatherLogo from "./assets/weather-img.png";
// const URL="https://api.weatherapi.com/v1/current.json?key=135249da8ab748c880482547241203&q={}"
function Weather() {

    const [input, setInput] = useState("");
    const [weatherData, setWeatherData] = useState(null);


    useEffect(() => {
        const getInitialWeatherData = async () => {
            const cities = ["New York", "Paris", "Tokyo", "London", "Sydney", "Rome", "Cairo", "Moscow", "Dubai"];
            const randomCity = cities[Math.floor(Math.random() * cities.length)];
            try {
                const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=135249da8ab748c880482547241203&q=${randomCity}`)
                const jsonRes = await res.json();
                console.log(jsonRes);
                setWeatherData({
                    cityName: jsonRes.location.name,
                    temp: jsonRes.current.temp_c,
                    humidityValue: jsonRes.current.humidity,
                    windKphValue: jsonRes.current.wind_kph,
                    iconUrl: jsonRes.current.condition.icon,
                });
            } catch (error) {
                console.error("Error fetching weather data: ", error);
            }
        }

        getInitialWeatherData();
    },[])


    const handleSearch = async () => {
        try {
            const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=135249da8ab748c880482547241203&q=${input}`);
            if (!res.ok) {
                throw new Error('Failed to fetch weather data');
            }
            const jsonRes = await res.json();
            console.log(jsonRes);
            setWeatherData({
                cityName: jsonRes.location.name,
                temp: jsonRes.current.temp_c,
                humidityValue: jsonRes.current.humidity,
                windKphValue: jsonRes.current.wind_kph,
                iconUrl: jsonRes.current.condition.icon,
            });
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
      };
    



    const handleChange = ((evt) => {
        const fieldValue = evt.target.value;
        setInput(fieldValue)
    })
    return (
        <>
            <div className="main-container">

                {/* serach-bar */}
                <div className="search-bar">
                    <input className="search-input" type="text" placeholder="Search_Place" name="search-input" value={input} onChange={handleChange} onKeyPress={handleKeyPress}/>
                    <button className="search-icon" onClick={handleSearch}>
                        <img src={searchLogo} alt="search" />
                    </button>
                </div>

                {/* weather image */}
                <div className="weather-img">
                    {/* <img src={weatherLogo} /> */}
                    {/* if intial data is null then it will get short circuit */}
                    {weatherData && <img src={weatherData.iconUrl} alt="weather icon" />}
                    {/* <img src={weatherData.iconUrl} /> */}
                </div>


                {/* weather Temp Detials Div */}
                <div className="weather-temp">
                    {/* {weatherData.temp}°C */}
                    {weatherData && <>{weatherData.temp}°C </>}
                </div>
                <div className="weather-city">{weatherData && weatherData.cityName}</div>

                {/* other wether details */}
                <div className="extra-weatherData">
                    <div className="weather-element1">
                        <img src=""></img>
                        {weatherData && <div className="humidity-precentage">{weatherData.humidityValue}% Humidity</div>}
                    </div>
                    <div className="weather-element2">
                        <img src=""></img>
                        {weatherData && <div className="wind-speed">{weatherData.windKphValue}kph  Wind Speed</div>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Weather;
