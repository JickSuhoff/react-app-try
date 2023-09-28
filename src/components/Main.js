import React, { useState, useEffect, useRef } from 'react';
import MainNavigation from './MainNavigation';
import OrganizationList from './OrganizationList';
import DefaultPage from './DefaultPage';
import Footer from './Footer';
import Sidebar from './Sidebar';
import styles from './Main.module.css';
import DropDownMenu from './DropDownMenu';

const Main = () => {
    const [organizations, setOrganizations] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDropDownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        try {
            const data = localStorage.getItem('organizations');
            if (data !== null) {
                setOrganizations(JSON.parse(data));
            }
        } catch (error) {
            console.error(error);
        }
        const handleDocumentMouseDown = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleDocumentMouseDown);
        return () => {
            document.removeEventListener('mousedown', handleDocumentMouseDown);
        };
    }, []);


    return (
        <div className={styles.main}>
            <div className={isSidebarOpen ? styles.contentWithPadding : ''}>
                <MainNavigation toggleDropDown={() => setIsDropdownOpen(!isDropDownOpen)} />
                <div className="dropdown-container" ref={dropdownRef}>
                    <DropDownMenu isOpen={isDropDownOpen} />
                </div>
                {organizations.length ? (
                    <OrganizationList organizations={organizations} setOrganizations={setOrganizations} />
                ) : (
                    <DefaultPage />
                )}
            </div>
            <Footer
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                isDefaultPage={organizations.length === 0}
            />
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        </div>
    );
};

export default Main;
































































