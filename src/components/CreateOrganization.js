import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MainNavigation from './MainNavigation';
import Footer from './Footer';
import Sidebar from './Sidebar';
import DropDownMenu from './DropDownMenu';
import styles from "./CreateOrganization.module.css";
import { usePopup } from './PopupContext'; // Import the usePopup hook

const CreateOrganization = () => {
    const [newOrgName, setNewOrgName] = useState('');
    const [newCardType, setNewCardType] = useState('');
    const [newCardNumber, setNewCardNumber] = useState('');
    const [newCreationDate, setNewCreationDate] = useState('');
    const [newStatus, setNewStatus] = useState('');
    const [organizations, setOrganizations] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDropDownOpen, setIsDropdownOpen] = useState(false);
    const [orgNameValid, setOrgNameValid] = useState(true);
    const [cardTypeValid, setCardTypeValid] = useState(true);
    const [cardStatusValid, setCardStatusValid] = useState(true);


    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const { openPopup } = usePopup(); // Use the usePopup hook

    useEffect(() => {
        const storedOrganizations = JSON.parse(localStorage.getItem('organizations')) || [];
        setOrganizations(storedOrganizations);

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

    const handleCreateOrganization = () => {
        let isValid = true;

        if (newOrgName.trim() === '') {
            setOrgNameValid(false);
            isValid = false;
        } else {
            setOrgNameValid(true);
        }

        if (newCardType === '') {
            setCardTypeValid(false);
            isValid = false;
        } else {
            setCardTypeValid(true);
        }

        if (newStatus === '') {
            setCardStatusValid(false);
            isValid = false;
        } else {
            setCardStatusValid(true);
        }
        if (isValid) {
            const newOrg = {
                id: organizations.length + 1,
                name: newOrgName,
                cardType: newCardType,
                cardNumber: newCardNumber,
                creationDate: newCreationDate,
                cardStatus: newStatus,
            };
            localStorage.setItem('organizations', JSON.stringify([...organizations, newOrg]));
            navigate("/");

            openPopup('Organization created');
        }

    };

    const generateRandomNumber = () => {
        const min = 1;
        const max = 100;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const getCurrentDate = () => {
        const now = new Date();
        const dd = String(now.getDate()).padStart(2, '0');
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const yy = String(now.getFullYear()).slice(-2);
        return `${dd}.${mm}.${yy}`;
    };
    useEffect(() => {
        const newRandomNumber = generateRandomNumber();
        setNewCardNumber(newRandomNumber.toString());
        const newCreationDate = getCurrentDate();
        setNewCreationDate(newCreationDate);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCreateOrganization(newOrgName, newCardType, newCardNumber, newCreationDate, newStatus);
    };

    const cancelHandler = () => {
        navigate("/");
    }

    const handleOrgNameFocus = () => {
        setOrgNameValid(true);
    };

    const handleCardTypeFocus = () => {
        setCardTypeValid(true);
    };

    const handleCardStatusFocus = () => {
        setCardStatusValid(true);
    };

    const mainStyle = {
        paddingLeft: isSidebarOpen ? '278px' : '0',
    };

    return (
        <>
            <div className={styles.formWrapper} style={mainStyle}>
                <MainNavigation toggleDropDown={() => setIsDropdownOpen(!isDropDownOpen)} />
                <div className="dropdown-container" ref={dropdownRef}>
                    <DropDownMenu isOpen={isDropDownOpen} />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formList}>
                        <div>
                            <input
                                type="text"
                                placeholder="Name"
                                id="orgName"
                                value={newOrgName}
                                onChange={(e) => setNewOrgName(e.target.value)}
                                onFocus={handleOrgNameFocus}
                                className={!orgNameValid ? styles.errorBorders : ''}
                            />
                            {!orgNameValid && <span className={styles.errorLabel}>Name is not valid</span>}
                        </div>
                        <div>
                            <select
                                id="cardType"
                                onChange={(e) => setNewCardType(e.target.value)}
                                value={newCardType}
                                onFocus={handleCardTypeFocus}
                                className={!orgNameValid ? styles.errorBorders : ''}
                            >
                                <option value="" disabled hidden>Card type</option>
                                <option value="Discount">Discount</option>
                                <option value="Cumulative">Cumulative</option>
                                <option value="Other">Other</option>
                            </select>
                            {!cardTypeValid && <span className={styles.errorLabel}>Card type is not valid</span>}
                        </div>
                        <div>
                            <input
                                type="text"
                                id="newCardNumber"
                                value={`Card number ${newCardNumber}`}
                                placeholder="Card Number"
                                readOnly
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                id="newCreationDate"
                                value={`Creation date ${newCreationDate}`}
                                readOnly
                            />
                        </div>
                        <div>
                            <select
                                id="cardStatus"
                                onChange={(e) => setNewStatus(e.target.value)}
                                value={newStatus}
                                onFocus={handleCardStatusFocus}
                                className={!orgNameValid ? styles.errorBorders : ''}
                            >
                                <option value="" disabled hidden>Status</option>
                                <option value="Active">Active</option>
                                <option value="Not ctive">Not active</option>
                            </select>
                            {!cardStatusValid && <span className={styles.errorLabel}>Status is not valid</span>}
                        </div>
                    </div>
                    <div>
                        <button onClick={cancelHandler}>Cancel</button>
                        <button type="submit">Save</button>
                    </div>
                </form>
                <span className={styles.restline}></span>
            </div>
            <Footer toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        </>
    );
};

export default CreateOrganization;






















