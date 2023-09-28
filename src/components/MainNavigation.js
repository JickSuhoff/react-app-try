import React, { useEffect, useState } from 'react';
import userIcon from '../images/userIcon.svg';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './MainNavigation.module.css';

const MainNavigation = ({ toggleDropDown }) => {
    const [userName, setUserName] = useState('John Smith');
    const location = useLocation();

    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        if (storedUserName) {
            setUserName(storedUserName);
        }
    }, []);
    

    return (
        <div className={styles.mainNav}>
            <div className={styles.userField}>
                <p>{userName}</p>
                <img src={userIcon} alt="userIcon" />
                <div onClick={toggleDropDown}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div className={styles.navField}>
                <p>Main <span>{' >'}</span></p>
                <NavLink to="/" end>
                    Organizations
                </NavLink>
                {location.pathname.includes('/create-organization') && (
                    <>
                        <span>{' >'}</span>
                        <NavLink to="/create-organization" end>
                            Create organization
                        </NavLink>
                    </>
                )}
                {location.pathname.includes('/update-organization') && (
                    <>
                        <span>{' >'}</span>
                        <NavLink to="/update-organization" end>
                            Update organization
                        </NavLink>
                    </>
                )}
                {location.pathname.includes('/change-role') && (
                    <>
                        <span>{' >'}</span>
                        <NavLink to="/change-role" end>
                            Change role
                        </NavLink>
                    </>
                )}
            </div>
        </div>
    );
};

export default MainNavigation;


































