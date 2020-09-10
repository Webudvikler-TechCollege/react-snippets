import React, { useEffect, useState } from 'react'

// Funktion til at sortere med
function sortByKey(array, key, dest) {
    let sorted_array;
    let new_array = [...array];

    switch(key) {
        default:
        case "id":
            sorted_array = new_array.sort((low, high) => low.id - high.id);
            break;
        case "zipcode":
            sorted_array = new_array.sort((low, high) => low.zipcode - high.zipcode);
            break;
        case "firstname":
            sorted_array = new_array.sort(function(a, b) {
                var x = a[key].toLowerCase(); var y = b[key].toLowerCase();
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
            break;
    }
    if(dest === 'desc') {
        sorted_array.reverse();
    }
    return sorted_array;
}

async function getData(token) {
    let headers = {
        'Authorization': `Bearer ${token}`
    };
    try {
        const url = `https://api.mediehuset.net/rordal/registrations`
        const response = await fetch(url, headers);
        let data = await response.json();
        return sortByKey(data.items, 'id');
    } catch (error) {
        console.log(error);
    }
}

function List(props) {
    const [query, setQuery] = useState('');

    // get participants
    const [apiData, setApiData] = useState(true)


    useEffect(() => {
        getData(props.loginData.access_token)
            .then((data) => {
                //console.log(data);
                setApiData(data);
            })
    }, [props.loginData.access_token]);

    async function getSortResult(e, list) {
        let sortVal = e.target.value.split('_');
        setApiData(sortByKey(list, sortVal[0], sortVal[1]));
    }   

    return (
        <div>
            <section>
                    <select name="sort" onChange={(e) => getSortResult(e, apiData)}>
                        <option value="firstname_asc">Alfabetisk (A-Z)</option>
                        <option value="firstname_desc">Alfabetisk (Z-A)</option>
                        <option value="zipcode_asc">Postnummer (Stigende)</option>
                        <option value="zipcode_desc">Postnummer (Faldende)</option>
                    </select>
                    </section>
                    {apiData.length > 0 && apiData.map((item, i) => {
                            return (
                                <div key={i}>
                                    <p>ID: {item.id}</p>
                                    <p>Navn: {item.firstname} {item.lastname}</p>
                                    <p>Fra: {item.city}</p>
                                    <p>E-mail: {item.email}</p>
                                    <p>Postnr: {item.zipcode}</p>
                                    <p>{item.run_id === 1 && "Jeg skal løbe 10km"}</p>
                                    <p>{item.run_id === 2 && "Jeg skal løbe 5km"}</p>
                                    <p>{item.run_id === 3 && "Jeg skal løbe one mile"}</p>
                                </div>
                            )
                    })}
            </div>
     )
}

export default List