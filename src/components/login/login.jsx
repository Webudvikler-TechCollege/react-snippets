import React, {useState, useEffect} from 'react'

function Login(props){

    // Ha lavet en form
    // sendt det formdata til API
    // ha en token tilbage og gemme den
    // fortæl brugeren at de er logget ind

    // states til at gemme username, password og token
    const [username, setUsername] = useState("Indtast brugernavn")
    const [password, setPassword] = useState("Indtast password")
    const [token, setToken] = useState([])

    // funktion til at hente token udfra brugernavn og password
    async function getToken(e){
        e.preventDefault()
        let formData = new FormData()

        formData.append('username', username)
        formData.append('password', password)
        
        let options = {
            method: "POST",
            body: formData,
        }

        try {
          const url = `https://api.mediehuset.net/token`
          const response = await fetch(url, options)
          const data = await response.json()
          setToken(data)
        }
        catch (error){
           console.log(error)
        }
      }    

      function logOut(e){
          e.preventDefault()
          sessionStorage.removeItem("token")
          props.setLoginData([])
      }
    
      //useEffect til at gemme token i sessionstorage, når token er modtaget, så den kan hentes i App.js
      useEffect(() => {
        if (token.user_id){
            props.setLoginData(token)
            sessionStorage.setItem("token", JSON.stringify(token));
        }
      }, [token])

      // returner HTML 
    return (
        <>
            <h1>Login side</h1>
            {props.loginData.user_id && <span>Du er nu logget ind</span>}
            <form>
                {!props.loginData.user_id &&
                 <>
                    <label>Brugernavn</label>
                    <input value={username} onClick={()=>{setUsername("")}} onChange={(e)=>{setUsername(e.target.value)}}></input>
                    
                    <label>Password</label>
                    <input type="password" value={password} onClick={()=>{setPassword("")}} onChange={(e)=>{setPassword(e.target.value)}}></input>
                    
                    <button onClick={(e)=>{getToken(e)}}>Log ind</button>
                </>
                }
                {props.loginData.user_id && 
                    <button onClick={(e)=>{logOut(e)}}>Log ud</button>
                }

            </form>
        </>
    )
}

export default Login