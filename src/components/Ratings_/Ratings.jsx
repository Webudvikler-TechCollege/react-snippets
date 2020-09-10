import React, {useState, useEffect} from 'react'

function Ratings(props){

    // States til at gemme ID og formdata
    const [allHotels, setAllHotels] = useState([])
    const [hotelID, setHotelID] = useState(0)
    const [ratings, setRatings] = useState([])
    const [comment, setComment] = useState("")
    const [numberStars, setNumberStars] = useState(1)

    // funktion til at fetche alle hoteller
    async function fetchAllHotels(){
        let url = `https://api.mediehuset.net/overlook/hotels/by_city/0`
        let data = await props.doFetch(url)
        setAllHotels(data)
    }

    // funktion til at få bruger ratings ud fra hotel id, med bearer token som auth
    async function getRatings(){    
        let headers = {
            'Authorization' : `Bearer ${props.loginData.access_token}`
        }
        try {
          const url = `https://api.mediehuset.net/overlook/ratings/list_by_hotel/${hotelID}`
          const response = await fetch(url, headers)
          const data = await response.json()
          setRatings(data)
        }
        catch (error){
           console.log(error)
        }
      }


    // funktion til at sende en rating ud fra et givent hotel id
    async function sendComment(e){
        e.preventDefault()
        let formData = new FormData()

        formData.append('hotel_id', hotelID)
        formData.append('num_stars', numberStars)
        formData.append('comment', comment)
        
        let options = {
            method: "POST",
            body: formData,
            headers: {
                'Authorization' : `Bearer ${props.loginData.access_token}`
            }
        }
        
        try {
          const url = `https://api.mediehuset.net/overlook/ratings`
          const response = await fetch(url, options)
          const data = await response.json()
          console.log(data)
          getRatings()
        }
        catch (error){
           console.log(error)
        }

    }

    // useEffect til at hente alle hoteller når componentet mounter
    useEffect(() => {
        fetchAllHotels()
    }, [])

    // useEffect til at hente ratings når en bruger vælger et hotel (kører når hotelID ændres)
    useEffect(() => {
        if (!hotelID == 0){
            getRatings()
        }
    }, [hotelID])

    // returner HTML
    return (
        <>
        <h1>Ratings side</h1>
        <select onChange={(e)=>{setHotelID(e.target.value)}}>
            <option value={0}>Vælg et hotel</option>
            {
                allHotels.items && allHotels.items.map((item, index) =>{
                    return <option key={index} id={item.id} value={item.id}>{item.title}</option>
                })
            }
        </select>

        <section>
            {
                ratings.items && ratings.items.map((item, index) => {
                   return(
                    <div key={index}>
                        <p>{item.comment}</p>
                        <p>{item.num_stars}</p>
                    </div>
                    )
                })
            }
        </section>

        <form>
            <label>Kommentar</label>
            <input onChange={(e)=>{setComment(e.target.value)}}></input>
            <select onChange={(e)=>{setNumberStars(e.target.value)}}>
                <option value={1}>1 stjerne</option>
                <option value={2}>2 stjerner</option>
                <option value={3}>3 stjerner</option>
                <option value={4}>4 stjerner</option>
                <option value={5}>5 stjerner</option>
            </select>
            <button onClick={(e)=>{sendComment(e)}}>Send kommentar</button>
        </form>

        </>
    )
}

export default Ratings