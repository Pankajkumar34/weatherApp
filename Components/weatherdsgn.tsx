"use client"
import React from "react";
import Image from "next/image";
import { WeatherdsgnProps } from "./weatherModal";
const weatherdsgn:React.FC<WeatherdsgnProps> =({searchWeather,error,country,feelslike,searchData,handleInputChange, temperatureInCelsius,temperData,iconUrl})=>{
    return(
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
            <div className="sm:w-[100%] weather-box w-[50%] m-auto shadow p-2 rounded-[10px] border-white">
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
                {error && <p className="text-white">{error?.message}</p>}
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
    )
}

export default weatherdsgn;