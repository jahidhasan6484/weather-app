import { useState, useEffect } from "react";
import { searchCityOptions, weatherDetailsOptions, forcastOptions } from '../Options/Options';
import sunrise from '../../images/sunrise.png';
import sunset from '../../images/sunset.png';

const Search = () => {
    const [cityName, setCityName] = useState('');
    const [cities, setCities] = useState([]);
    const [weatherDetails, setWeatherDetails] = useState({})

    const [location, setLocation] = useState({
        "name": '',
        "country": '',
        "latitude": '',
        "longitude": ''
    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const updatedLocation = {
                ...location,
                name: location.name,
                country: location.country,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
            setLocation(updatedLocation)
        })
    }, [])

    const [showSearchData, setShowSearchData] = useState(true)

    const handleInputSearch = (e) => {
        setCityName(e.target.value);

        // const updatedLocation = {
        //     ...location,
        //     name: '',
        //     country: '',
        //     latitude: '',
        //     longitude: ''
        // }
        // setLocation(updatedLocation);
        setShowSearchData(true);
    };

    const handleSelect = (cityName, countryName, latitude, longitude) => {
        setCityName(cityName);

        const updatedLocation = {
            ...location,
            name: cityName,
            country: countryName,
            latitude: latitude,
            longitude: longitude
        }
        setLocation(updatedLocation);
        setShowSearchData(false);
    }


    useEffect(() => {
        fetch(`https://foreca-weather.p.rapidapi.com/location/search/${cityName}`, searchCityOptions)
            .then(response => response.json())
            .then(response => setCities(response.locations))
            .catch(err => console.log(err));
    }, [cityName])

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=b549ccb7ffc448882b36981df9909b1f`)
            .then(response => response.json())
            .then(response => setWeatherDetails(response))
            .catch(err => console.log(err));
    }, [location.latitude])

    const kelvinToCelcius = (temp) => {
        return Math.round(temp - 273.15) + "° C";
    }

    const timestampToLocalTime = (timestamp) => {
        let date = new Date(timestamp * 1000);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let seconds = "0" + date.getSeconds();

        let am = "AM";
        let pm = "PM";

        if (hours >= 12) {
            return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + ' ' + pm
        } else {
            return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + ' ' + am
        }
    }




    return (
        <>
            <div className="py-1 mb-2">
                <input onChange={handleInputSearch} value={cityName} type="text" className="form-control" id="city" name="city" placeholder="Search city for weather details" />
            </div>

            {
                showSearchData == true &&
                <ul>
                    {
                        cities.length > 0 && cities.map((location, index) => {
                            if (index < 3) {
                                return (
                                    <li className="city_option" key={location.id} onClick={() => handleSelect(location.name, location.country, location.lat, location.lon)}>{location.name}, {location.country}</li>
                                )
                            }
                        })
                    }
                </ul>
            }

            {
                weatherDetails.id &&
                <div className="mt-5 row">
                    <div className="col-md-6">
                        <div className="weather_card row">
                            <div className="col-md-6 first">
                                <div>
                                    <h4 className="location">{weatherDetails.name}, {location.country ? location.country : weatherDetails.sys.country}</h4>
                                    <p className="weatherType">{weatherDetails.weather[0].main}</p>
                                </div>
                                <p className="weather">{kelvinToCelcius(weatherDetails.main.temp)}</p>
                                <div className="row">
                                    <div className="col-md-6 col-6 text-center p-2">
                                        <img className="bottom_image mb-2" src={sunrise} alt="Sunrise"></img>
                                        <p>{timestampToLocalTime(weatherDetails.sys.sunrise)}</p>
                                    </div>
                                    <div className="col-md-6 col-6 text-center p-2">
                                        <img className="bottom_image mb-2" src={sunset} alt="Sunset"></img>
                                        <p>{timestampToLocalTime(weatherDetails.sys.sunset)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 second">
                                <img className="weather_image" src={`icons/${weatherDetails.weather[0].icon}.png`} alt="image"></img>
                                <p>Feels Like: {kelvinToCelcius(weatherDetails.main.feels_like)}</p>
                                <p>Humidity: {weatherDetails.main.humidity}%</p>
                                <p>Pressure: {weatherDetails.main.pressure} hPa</p>
                                <p>Max: {kelvinToCelcius(weatherDetails.main.temp_max)}</p>
                                <p>Min: {kelvinToCelcius(weatherDetails.main.temp_min)}</p>
                            </div>
                        </div>
                        <div className="mt-5 forcast">
                            <p>Local</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <p>Forcast</p>
                    </div>
                </div>
            }




        </>
    )
}

export default Search;