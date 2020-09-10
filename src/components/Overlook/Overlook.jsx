import React, {useState, useEffect} from 'react'
import Style from './Overlook.module.scss'

function Overlook(props){

    // states til at gemme ID og data fra api
    const [countries, setCountries] = useState([])
    const [countryID, setCountryID] = useState(0)
    const [cities, setCities] = useState([])
    const [hotels, setHotels] = useState([])
    const [cityID, setCityID] = useState(0)

    // Funktion til at fetche lande
    async function fetchCountries(){
        const url = `https://api.mediehuset.net/overlook/countries`
        let data = await props.doFetch(url)
        setCountries(data)
    }

    // Funktion til at fetche byer med et lands ID
    async function fetchCities(id){
        const url = `https://api.mediehuset.net/overlook/cities/by_country/${id}`
        let data = await props.doFetch(url)
        setCities(data)
    }

    // Funktion til at fetche hoteller med en by's ID
    async function fetchHotels(id){
        const url = `https://api.mediehuset.net/overlook/hotels/by_city/${id}`
        let data = await props.doFetch(url)
        setHotels(data)
    }

    // UseEffect med et tomt dependency array (kører kun en gang når component mounter)
    useEffect(() => {
        fetchCountries()
    }, [])

    // UseEffect til at fetche cities, kører når Country ID ændrer sig
    useEffect(() => {
        if (!countryID == 0){
            fetchCities(countryID)
        }
    }, [countryID])

    // UseEffect til at fetche hotels, kører når City ID ændrer sig
    useEffect(() => {
        if (!cityID == 0){
            fetchHotels(cityID)
        }
    }, [cityID])

    // Returner HTML
    return (
        <>
            <h1>Lande</h1>

            {!cities.items && countries.items && countries.items.map((item, i) => {
                return (
                    <div key={i} className={Style.wrapper}>
                        <h2>{item.name}</h2>
                        <img alt={item.title} id={item.id} onClick={(e)=>{setCountryID(e.target.id)}} src={item.image}></img>
                    </div>
                )
            })}

            {!hotels.items && cities.items && cities.items.map((item, i) => {
                return (
                    <div key={i} className={Style.wrapper}>
                        <h2>{item.name}</h2>
                        <img alt={item.title} id={item.id} onClick={(e)=>{setCityID(e.target.id)}} src={item.image}></img>
                    </div>
                )
            })}          

            {hotels.items && hotels.items.map((item, i) => {
                return (
                    <div key={i} className={Style.wrapper}>
                        <h2>{item.title}</h2>
                        <img alt={item.title} id={item.id} onClick={(e)=>{console.log(e.target.id)}} src={item.image}></img>
                    </div>
                )
            })}          
        </>
    )
}

export default Overlook