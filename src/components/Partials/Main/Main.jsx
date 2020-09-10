import React from 'react';
import Styles from "./Main.module.scss";

export default function Main(props) {
    return (
        <main className={Styles.sitemain}>
            {props.children}
        </main>
    )
}