import React, { useState, useEffect } from 'react';

function AddToCart(props) {

    // states til at gemme ID og data fra api
    const [items, setItems] = useState([]);
    const [productData, setProducts] = useState([]);
    
    async function toCart() {
        console.log(items);

        let formData = new FormData();
        formData.append('quantity', items.quantity)
        formData.append('product_id', items.product_id)
        formData.append('product_name', items.name)
        formData.append('price', items.price)

        let options = {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${props.loginData.access_token}`
            }
        }        
        try {
            const url = `https://api.mediehuset.net/snippets/cart`
            const response = await fetch(url, options);
            const data = await response.json();
            console.log(data);
        }
        catch (error) {
            console.log(error)
        }
    }

    // Funktion til at fetche produkter
    async function fetchProducts(){
        const url = `https://api.mediehuset.net/bakeonline/products`
        let data = await props.doFetch(url);
        setProducts(data)
    }

    // UseEffect med et tomt dependency array (kører kun en gang når component mounter)
    useEffect(() => {
        fetchProducts()
    }, [])

    // Returner HTML
    return (
        <>
            <h1>Tilføj kurv</h1>

            {productData.products && productData.products.map((item, i) => {

                return (
                    <div key={item.id}>
                        <hr />
                        <h4>{item.title}</h4>
                        <form>
                            <input type="hidden" name="product_id" value={item.id} />
                            <input type="hidden" name="product_name" value={item.title} />
                            <input type="hidden" name="price" value={item.price} />
                            <label htmlFor="quantity">Antal:</label>
                            <input type="number" name="quantity" 
                                onChange={(e) => setItems({
                                    product_id: item.id,
                                    price: item.price,
                                    name: item.title,
                                    id: item.id,
                                    quantity: e.target.value
                                })} />
                            <button type="button" onClick={() => toCart()}>Læg i kurv</button>
                        </form>
                    </div>
                )
            })}
        </>
    )
}

export default AddToCart