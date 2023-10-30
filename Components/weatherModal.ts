export interface WeatherdsgnProps {
    searchWeather: string;
    error: any; 
    country: any; 
    feelslike: number;
    searchData: (e: React.FormEvent) => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    temperatureInCelsius: number | null;
    temperData: any; 
    iconUrl: string;
  }
 

export interface WeatherData {
    name: string;
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
    sys: {
      country: string;
    };
  }