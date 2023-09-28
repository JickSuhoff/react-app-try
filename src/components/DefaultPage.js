import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './DefaultPage.module.css';
import pack from "../images/pack.png";

const DefaultPage = () => {


    return (
        <div className={styles.defaultPage}>
            <div className={styles.defaultNav}>
                <NavLink to="/create-organization">Create Organization</NavLink>
            </div>
            <div className={styles.emptyList}>
                <img src={pack} alt="pack" />
                <p>No organization, please create one</p>
                <span></span>
            </div>
        </div>
    );
};

export default DefaultPage;
























