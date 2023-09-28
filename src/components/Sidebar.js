
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';
import settingsIcon from "../images/settings.svg";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <div className={`${isOpen ? styles.sidebar : styles.closed}`}>
            <div className={styles.sidebarLogo}>
                <div>
                    <span></span>
                    <span></span>
                </div>
                <span></span>
                <p>Clients <br /> Card</p>
            </div>
            <div className={styles.sidebarButtons}>
                <span></span>
                <div className={styles.sidebarLinkBox}>
                    <img src={settingsIcon} alt="settingsIcon" />
                    <NavLink to="/change-role">Change role</NavLink>
                </div>
                <span></span>
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
                    <p>Hide Menu</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;