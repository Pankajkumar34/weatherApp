"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import weatherIcon from "../public/assets/weather.png";
import { countryCode } from "@/CountryCodes";
const Weather: React.FC = () => {
  const [searchWeather, setSearchWeather] = useState<string>(""); // input value
  const [searchCity, setSearchCity] = useState<string>(""); // search city name
  const [iconUrl, setsetIconUrl] = useState<string>(""); // search city name
  const [temperatureInCelsius, setTemperatureInCelsius] = useState<string>(); /// city tempreature
  const [feelslike, setFeelslike] = useState<string>(); // feels like
  const [temperData, setTemperatureData] = useState<any>(); // all weather data store
  const [error, setEorror] = useState<object | string>([]); // error
  const [country, setCountry] = useState<any>([]); // country code

  const APIfetch = async () => {
    let api_key = "9bc47850ac2ee99d2da4f6d993c78bb9";
    let base_url = " https://api.openweathermap.org/data/2.5/weather?";

    let complete_url = `${base_url}appid=${api_key}&q=${
      !searchCity ? "London" : searchCity
    }`;

    try {
      const response = await fetch(complete_url);
      if (response.ok) {
        let data: any = await response.json();
        setTemperatureData(data);
        console.log(data, "data");

        setEorror("");
        // Extract the temperature in Celsius
        const temperatureInKelvin = data.main.temp;
        const iconCode = data.weather[0].icon;
        const Feels_like = data.main.feels_like;
        const temperatureInCelsius: number = temperatureInKelvin - 273.15;
        const feels_likes: number = Feels_like - 273.15;
        setTemperatureInCelsius(temperatureInCelsius.toFixed(1));
        setFeelslike(feels_likes.toFixed(1));

        const CountryCode = data.sys.country;
        const matchedCountry = countryCode.find(
          (item) => item.code === CountryCode
        );

        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
        setsetIconUrl(iconUrl);

        if (matchedCountry) {
          setCountry(matchedCountry);
        } else {
          console.log("Country code not found");
        }
      } else {
        let data: any = await response.json();
        setEorror(data);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const searchData = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchWeather) {
      alert("Enter city name");
    } else {
      setSearchCity(searchWeather);
      APIfetch();
      setSearchWeather("");
    }
  };

  useEffect(() => {
    APIfetch();
  }, [searchCity]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEorror("");
    setSearchWeather(e.target.value);
  };

  return (
    <>
      <div
        className="weather_main h-[100vh] flex items-center"
        style={{
          backgroundImage:
            "url(https://img.freepik.com/free-photo/amazing-beautiful-sky-with-clouds_58702-1653.jpg?w=740&t=st=1698656901~exp=1698657501~hmac=0c99b4bd5e2b02fdb5bb91e0bffa6ed13a0c5715a5104bfe4441183a92766cfc)",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <div className="weather-box w-[50%] m-auto shadow p-2 rounded-[10px] border-white">
            <form className="text-center my-5" onSubmit={searchData}>
              <input
                type="text"
                value={searchWeather}
                onChange={handleInputChange}
                placeholder="Enter your city name"
                className="p-[5px] rounded"
              />{" "}
              <input
                type="submit"
                value="search"
                className="box-shadow rounded p-[5px] border text-white"
              />
              {error && <p className="text-white">{error.message}</p>}
            </form>
            <div className="weather_show  w-[100%] h-[300px]">
              <div className="weather_count">
                <h2 className=" text-center text-white">{temperData?.name}</h2>
                <div className="relative">
                  <Image
                    src={iconUrl}
                    width={100}
                    height={100}
                    className=" m-auto p-3 "
                    alt="image"
                  />
                  <h3 className="absolute text-center left-[20px] top-0 leading-[14px] text-white mt-[3px] text-[10px]">
                    <span className="">Country</span>
                    <br />
                    <span>{country.name}</span>
                  </h3>
                </div>

                <div className="text-center text-white m-2">
                  <p>{temperData?.weather[0].description}</p>

                  {temperatureInCelsius !== null && (
                    <p className="temperature text-white text-[20px] ">
                      <span className="temperature-output">
                        {temperatureInCelsius}
                      </span>
                      &deg;C
                    </p>
                  )}
                </div>

                <div className="border-t p-2 text-white">
                  <p className="text-[#b6dfe1] text-[12px]">
                    {" "}
                    Feels like
                    <span className="text-white">: {feelslike} &deg;C</span>
                  </p>
                  <p className="text-[#b6dfe1] text-[12px]">
                    {" "}
                    humidity{" "}
                    <span className="text-white">
                      : {temperData?.main.humidity}%
                    </span>
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
