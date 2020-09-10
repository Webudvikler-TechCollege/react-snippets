import React from 'react'
import { Link } from "react-router-dom";
import Style from './Nav.module.scss'

function Navbar() {
    return (
        <nav className={Style.navbar}>
            <ul>
                <Link className={Style.link} to="/">Forside</Link>
                <Link className={Style.link} to="/hoteller">Hoteller</Link>
                <Link className={Style.link} to="/login">Login</Link>
                <Link className={Style.link} to="/ratings">Ratings</Link>
                <Link className={Style.link} to="/addtocard">Tilføj kurv</Link>
                <Link className={Style.link} to="/tilmelding">Tilmelding</Link>
            </ul>
        </nav>
    )
}

export default Navbar