import { useState, useEffect } from "react";
import { searchCityOptions, weatherDetailsOptions, forcastOptions } from '../Options/Options';
import image from '../../images/sunny.svg'

const Search = () => {
    const [cityName, setCityName] = useState('');
    const [searchData, setSearchData] = useState([])
    const [location, setLocation] = useState({
        "id": '',
        "name": '',
        "country": ''
    });
    const [weatherDetails, setWeatherDetails] = useState({})

    const [showSearchData, setShowSearchData] = useState(true)

    const handleInputSearch = (e) => {
        setCityName(e.target.value);
        const updatedLocation = {
            ...location,
            id: '',
            name: '',
            country: ''
        }
        setLocation(updatedLocation);
        setShowSearchData(true);
    };

    const handleSelect = (id, cityName, countryName) => {
        setCityName(cityName)

        const updatedLocation = {
            ...location,
            id: id,
            name: cityName,
            country: countryName
        }

        setLocation(updatedLocation);
        setShowSearchData(false);
    }


    useEffect(() => {
        fetch(`https://foreca-weather.p.rapidapi.com/location/search/${cityName}`, searchCityOptions)
            .then(response => response.json())
            .then(response => setSearchData(response.locations))
            .catch(err => console.log(err));
    }, [cityName])


    useEffect(() => {
        location.id && fetch(`https://foreca-weather.p.rapidapi.com/current/${location.id}?alt=0&tempunit=C&windunit=MS&tz=Europe%2FLondon&lang=en`, weatherDetailsOptions)
            .then(response => response.json())
            .then(response => setWeatherDetails(response.current))
            .catch(err => console.log(err));
    })
    
    // useEffect(() => {
    //     location.id && fetch(`https://foreca-weather.p.rapidapi.com/forecast/daily/${location.id}?alt=0&tempunit=C&windunit=MS&periods=8&dataset=full`, forcastOptions)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));
    // })

    return (
        <>
            <div className="py-1 mb-2">
                <input onChange={handleInputSearch} value={cityName} type="text" className="form-control" id="city" name="city" placeholder="Search city for weather details" />
            </div>

            {
                showSearchData == true &&
                <ul>
                    {
                        searchData.length > 0 && searchData.map((location) => {
                            return (
                                <li className="city_option" key={location.id} onClick={() => handleSelect(location.id, location.name, location.country)}>{location.name}, {location.country}</li>
                            )
                        })
                    }
                </ul>
            }

            {
                weatherDetails.temperature &&
                <div className="row">
                    <div className="col-md-7">
                        <div className="weather_card row">
                            <div className="col-md-8 first">
                                <div>
                                    <h4 className="location">{location.name}, {location.country}</h4>
                                    <p className="time">{weatherDetails.time}</p>
                                </div>
                                <p className="weather">{weatherDetails.temperature}°C</p>
                            </div>
                            <div className="col-md-4 second">
                                <img className="weather_image" src={image} alt={weatherDetails.symbolPhrase}></img>
                                <p>Feels Like: {weatherDetails.feelsLikeTemp}° C</p>
                                <p>Dew Point: {weatherDetails.dewPoint}° C</p>
                                <p>Pressure: {weatherDetails.pressure} kPa</p>
                                <p>Wind Speed: {weatherDetails.windSpeed} km/h</p>
                            </div>
                        </div>
                        <div className="forcast">
                            <p>AAA</p>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <p>AAAAAA</p>
                    </div>
                </div>
            }


            {/* {
                !weatherDetails &&
                <>
                    {
                        searchResult && searchResult.locations.map((city) => {
                            return (
                                <div key={city.id} onClick={() => handleSelect(city.id, city.name, city.country)}>
                                    <p>{city.name}, {city.country} - {city.id}</p>
                                </div>
                            )

                        })
                    }
                </>
            }


            {
                weatherDetails &&
                <div className="row mt-5">
                <div className="col-md-7">
                    <div className="weather_card row">
                        <div className="col-6 first">
                            <h5>AAA  </h5>
                            <p>June 11, 2022</p>
                            <p className="weather">{weatherDetails?.temperature}°C</p>
                        </div>
                        <div className="col-6 second">
                            <img className="weather_image" src={image} alt="weather"></img>
                            <p>feelsLikeTemp: {weatherDetails?.feelsLikeTemp}</p>
                            <p>temperature: {weatherDetails?.temperature}</p>
                        </div>
                    </div>
                    <div></div>
                </div>
                <div className="col-md-5">

                </div>
            </div>
            }  */}

        </>
    )
}

export default Search;