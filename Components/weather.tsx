"use client";
import React, { useEffect, useState } from "react";

import Weatherdsgn from "./weatherdsgn";
import { countryCode } from "@/CountryCodes";

import { WeatherData } from "./weatherModal";


const Weather: React.FC= () => {
  const [searchWeather, setSearchWeather] = useState<string>(""); // input value
  const [searchCity, setSearchCity] = useState<string>(""); // search city name
  const [iconUrl, setsetIconUrl] = useState<string>(""); // search city name
  const [temperatureInCelsius, setTemperatureInCelsius] = useState<number| any>(); /// city tempreature
  const [feelslike, setFeelslike] = useState<number| any>(); // feels like
  const [temperData, setTemperatureData] = useState<any>(); // all weather data store
  const [error, setEorror] = useState<any>({}); // error
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
        let data: WeatherData = await response.json();
        setTemperatureData(data);
        console.log(data, "data");

        setEorror({});
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
    <Weatherdsgn
    searchWeather={searchWeather}
    error={error}
    iconUrl={iconUrl}
    temperatureInCelsius={temperatureInCelsius}
    temperData={temperData}
    country={country}
    feelslike={feelslike}
    searchData ={searchData} handleInputChange={handleInputChange}/>
  </>
  );
};
export default Weather;
