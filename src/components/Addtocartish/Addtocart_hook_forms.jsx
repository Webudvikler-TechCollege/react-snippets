import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message"


function AddToCart(props) {

    // states til at gemme ID og data fra api
    const [productData, setProducts] = useState([]);
    const { register, handleSubmit, errors } = useForm();
    
    async function toCart(values) {

        console.log(values);
        
        let formData = new FormData();
        formData.append('quantity', values.quantity)
        formData.append('product_id', values.product_id)
        formData.append('product_name', values.product_name)
        formData.append('price', values.price)
        
        let headers = {
            'method': 'POST',
            'Authorization': `Bearer ${props.loginData.access_token}`,
            body: formData
        }        
        try {
            const url = `https://api.mediehuset.net/snippets/cart`
            const response = await fetch(url, headers);
            const data = await response.json();
            console.log(data);
        }
        catch (error) {
            console.log(error)
        }
    }

    const onSubmit = values => console.log(values);


    // Funktion til at fetche lande
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
                    <form key={item.id} onSubmit={handleSubmit(onSubmit)}>
                        <input type="hidden" name="product_id" value={item.id} ref={register} />
                        <input type="hidden" name="product_name" value={item.title} ref={register} />
                        <input type="hidden" name="price" value={item.price} ref={register} />
                        <label htmlFor="quantity">Antal:</label>
                        <input type="number" id="quantity" name="quantity" ref={register({required: 'Du skal udfylde et antal'})} />
                        <ErrorMessage errors={errors} name={"quantity"}>
                            {({message}) => <span>{message}</span>}
                        </ErrorMessage>

                        <input type="submit" value="Læg i kurv" />
                    </form>
                )
            })}
        </>
    )
}

export default AddToCart