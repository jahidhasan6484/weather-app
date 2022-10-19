import { useState, useEffect } from "react";
import { searchCityOptions, weatherDetailsOptions, forcastOptions } from '../Options/Options';
import image from '../../images/sunny.svg'

const Search = () => {

    const [cityName, setCityName] = useState('');
    const [searchResult, setSearchResult] = useState('');
    const [cityId, setCityId] = useState('');
    const [weatherDetails, setWeatherDetails] = useState('');



    const handleCity = (e) => {
        setCityName(e.target.value.toLowerCase());
        setCityId('');
        setWeatherDetails('')
    };

    const handleSelect = (id, cityName) => {
        setCityId(id);
        setCityName(cityName.toLowerCase())
    }


    useEffect(() => {
        fetch(`https://foreca-weather.p.rapidapi.com/location/search/${cityName}`, searchCityOptions)
            .then(response => response.json())
            .then(response => setSearchResult(response))
            .catch(err => console.log(err));
    }, [cityName])


    useEffect(() => {
        cityId && fetch(`https://foreca-weather.p.rapidapi.com/current/${cityId}?alt=0&tempunit=C&windunit=MS&tz=Europe%2FLondon&lang=en`, weatherDetailsOptions)
            .then(response => response.json())
            .then(response => setWeatherDetails(response.current))
            .catch(err => console.log(err));

        //FORCAST 

        // cityId &&     fetch('https://foreca-weather.p.rapidapi.com/forecast/daily/102643743?alt=0&tempunit=C&windunit=MS&periods=8&dataset=full', forcastOptions)
        // .then(response => response.json())
        // .then(response => console.log("FORCAST: ",response))
        // .catch(err => console.error(err));
    })

    // console.log("DETAILS IS HERE:", weatherDetails)


    // NEW PLACE

    // const options = {
    //     method: 'GET',
    //     headers: {
    //         'X-RapidAPI-Key': '4a3f924f0emsh02de14b912a18e4p101f05jsnce23894ededd',
    //         'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
    //     }
    // }; 

    // fetch('https://foreca-weather.p.rapidapi.com/observation/latest/102643743?lang=en', options)
    //     .then(response => response.json())
    //     .then(response => console.log("RES: ",response))
    //     .catch(err => console.error(err))


    return (
        <>
            <div className="py-1 mb-2">
                <input onChange={handleCity} value={cityName} type="text" className="form-control" id="city" name="city" placeholder="Search city for weather details" />
            </div>
            {/* {
                !weatherDetails &&
                <>
                    {
                        searchResult && searchResult.locations.map((city) => {
                            return (
                                <div key={city.id} onClick={() => handleSelect(city.id, city.name)}>
                                    <p>{city.name}, {city.country} - {city.id}</p>
                                </div>
                            )

                        })
                    }
                </>
            }


            {
                weatherDetails &&
                <div className="card">
                    <p>feelsLikeTemp: {weatherDetails?.feelsLikeTemp}</p>
                    <p>temperature: {weatherDetails?.temperature}</p>
                </div>
            } */}

            <div className="row mt-5">
                <div className="col-md-7">
                    <div className="weather_card row">
                        <div className="col-6 first">
                            <h5>Dhaka, Bangladesh</h5>
                            <p>June 11, 2022</p>
                            <p className="weather">32°C</p>
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
        </>
    )
}

export default Search;