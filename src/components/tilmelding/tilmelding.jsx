import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message"

function date2unix(date) {
    let stamp = new Date(date);
    return stamp.getTime() / 1000;
}

function Tilmelding(props) {

    // states til RHF 
    const { register, handleSubmit, errors } = useForm();
    
    const onSubmit = values => {

        //console.log(values);
        
        let formData = new FormData();

        formData.append('firstname', values.firstname)
        formData.append('lastname', values.lastname)
        formData.append('address', values.address)
        formData.append('zipcode', values.zipcode)
        formData.append('city', values.city)
        formData.append('email', values.email)
        formData.append('phone', values.phone)
        formData.append('birthdate', date2unix(values.birthdate))
        formData.append('gender', values.gender)
        formData.append('run_id', values.run_id)
        formData.append('comment', 'Bla bla bla')

        let options = {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${props.loginData.access_token}`
            }
        }
        try {
            const url = "https://api.mediehuset.net/rordal/registrations"
            fetch(url, options)
                .then(response => response.json())
                .then(data => console.log(data))

        } 
        catch(error) {
            console.error(error);
        }
        
    }

    // Returner HTML
    return (
        <>
            <h1>Tilmeldingsformular</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="run_id">Løb:</label>
                    <select name="run_id" 
                        ref={register({required: "Du skal vælge et løb!"})}>
                        <option value="">Vælg løb</option>
                        <option value="1">One Mile</option>
                        <option value="2">5 km</option>
                        <option value="3">10 km</option>
                    </select>
                    <ErrorMessage errors={errors} name={"run_id"}>
                        {({message}) => <span>{message}</span>}
                    </ErrorMessage>
                </div>
                <div>
                    <label htmlFor="firstname">Fornavn:</label>
                    <input type="text" name="firstname" 
                        ref={register({
                            required: 'Du skal udfylde dit fornavn'
                        })} />
                        <ErrorMessage errors={errors} name={"firstname"}>
                            {({message}) => <span>{message}</span>}
                        </ErrorMessage>

                </div>
                <div>
                    <label htmlFor="lastname">Efternavn:</label>
                    <input type="text" name="lastname" 
                        ref={register({
                            required: 'Du skal udfylde dit efternavn'
                        })} />
                        <ErrorMessage errors={errors} name={"lastname"}>
                            {({message}) => <span>{message}</span>}
                        </ErrorMessage>

                </div>
                <div>
                    <label htmlFor="address">Adresse:</label>
                    <input type="text" name="address" 
                        ref={register({
                            required: 'Du skal udfylde din adresse'
                        })} />
                        <ErrorMessage errors={errors} name={"address"}>
                            {({message}) => <span>{message}</span>}
                        </ErrorMessage>

                </div>
                <div>
                    <label htmlFor="zipcode">Postnummer:</label>
                    <input type="text" name="zipcode" 
                        ref={register({
                            required: 'Du skal udfylde dit postnummer'
                        })} />
                        <ErrorMessage errors={errors} name={"zipcode"}>
                            {({message}) => <span>{message}</span>}
                        </ErrorMessage>
                </div>
                <div>
                    <label htmlFor="city">By:</label>
                    <input type="text" name="city" 
                        ref={register({
                            required: 'Du skal udfylde en by'
                        })} />
                        <ErrorMessage errors={errors} name={"city"}>
                            {({message}) => <span>{message}</span>}
                        </ErrorMessage>
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" 
                        ref={register({
                            required: 'Du skal udfylde en email'
                        })} />
                        <ErrorMessage errors={errors} name={"email"}>
                            {({message}) => <span>{message}</span>}
                        </ErrorMessage>
                </div>
                <div>
                    <label htmlFor="email">Telefon:</label>
                    <input type="text" name="phone" 
                        ref={register({
                            required: 'Du skal udfylde et telefonnummer'
                        })} />
                        <ErrorMessage errors={errors} name={"phone"}>
                            {({message}) => <span>{message}</span>}
                        </ErrorMessage>
                </div>
                <div>
                    <label htmlFor="gender">Køn:</label>
                    <select name="gender" 
                        ref={register({required: "Du skal vælge et køn!"})}>
                        <option value="">Vælg køn</option>
                        <option value="f">Kvinde</option>
                        <option value="m">Mand</option>
                    </select>
                    <ErrorMessage errors={errors} name={"gender"}>
                        {({message}) => <span>{message}</span>}
                    </ErrorMessage>
                </div>
                <div>
                    <label htmlFor="birthdate">Fødselsdato:</label>
                    <input type="date" name="birthdate" 
                        ref={register({
                            required: 'Du skal angive din fødselsdato'
                        })} />

                    <ErrorMessage errors={errors} name={"birthdate"}>
                        {({message}) => <span>{message}</span>}
                    </ErrorMessage>
                </div>
                <input type="submit" value="Send" />
            </form>
        </>
    )
}

export default Tilmelding