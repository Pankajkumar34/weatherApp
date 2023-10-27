"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import weatherIcon from "../public/assets/weather.png";

const Weather: React.FC = () => {
  const [searchWeather, setSearchWeather] = useState<string>("");
  const [searchCity, setSearchCity] = useState<string>("");

  const [temperatureInCelsius, setTemperatureInCelsius] = useState<string>();
  const [temperData, setTemperatureData] = useState<any>();

  const APIfetch = async () => {
    let api_key = "9bc47850ac2ee99d2da4f6d993c78bb9";
    let base_url = "https://api.openweathermap.org/data/2.5/weather?";

    let complete_url = `${base_url}appid=${api_key}&q=${
      !searchCity ? "London" : searchCity
    }`;

    try {
      const response = await fetch(complete_url);
      if (response.ok) {
        let data: any = await response.json();
        setTemperatureData(data);

        // Extract the temperature in Celsius
        const temperatureInKelvin = data.main.temp;
        const temperatureInCelsius: number = temperatureInKelvin - 273.15;
        setTemperatureInCelsius(temperatureInCelsius.toFixed(1));
      } else {
        console.error("Failed to fetch data from the API.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchData = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchCity(searchWeather);
    APIfetch();
    setSearchWeather("");
  };

  useEffect(() => {
    APIfetch();
  }, [searchCity]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWeather(e.target.value);
  };

  return (
    <>
      <div className="weather_main bg-blue-500 h-[100vh]">
        <div className="container">
          <div className="weather-box flex justify-around items-center">
            <form className="text-center border p-3" onSubmit={searchData}>
              <h2 className="text-white my-2">Weather Search</h2>
              <input
                type="text"
                value={searchWeather}
                onChange={handleInputChange}
                placeholder="Enter your city name"
                className="p-2 rounded"
              />{" "}
              <br />
              <input
                type="submit"
                value="submit"
                className="box-shadow rounded p-2 border mt-2"
              />
            </form>
            <div className="weather_show border p-3  w-[345px] text-center h-[300px]">
              <div className="weather_count">
                <h2 className="box-shadow border-b-[white] border-b border-solid text-white">
                  Weather App
                </h2>
                <Image
                  src={weatherIcon}
                  className="w-[100px] m-auto p-3 "
                  alt="image"
                />
                <h2 className="text-white font-bold">{temperData?.name}</h2>
                {temperatureInCelsius !== null && (
                  <p className="temperature text-white text-[20px] text-center">
                    <span className="temperature-output">
                      {temperatureInCelsius}
                    </span>
                    &deg;C
                  </p>
                )}
                <div className="border text-white">
                  <p>
                    {" "}
                    Feels_like <span>{temperData?.main.feels_like}</span>
                  </p>
                  <p className="text-white">
                    {" "}
                    humidity <span>{temperData?.main.humidity}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Weather;
