import React from 'react';
import styles from './Footer.module.css';

const Footer = ({ toggleSidebar, isDefaultPage }) => {


    const footerStyle = {
        backgroundColor: isDefaultPage ? 'white' : 'rgb(243, 242, 242)'
    };

    return (
        <div className={styles.footerWrapper} style={footerStyle}>
            <div className={styles.bugerBtn} onClick={toggleSidebar}>
                <div className={styles.arrow}>
                    <span></span>
                    <span></span>
                </div>
                <div className={styles.burger}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <p>Show Menu</p>
            </div>
        </div>
    );
};

export default Footer;
