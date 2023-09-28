import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainNavigation from './MainNavigation';
import Footer from './Footer';
import Sidebar from './Sidebar';
import DropDownMenu from './DropDownMenu';
import styles from './CreateOrganization.module.css';
import { usePopup } from './PopupContext';

const UpdateOrganization = () => {
    const { id } = useParams();
    const [organizationData, setOrganizationData] = useState({});
    const [newOrgName, setNewOrgName] = useState('');
    const [newCardType, setNewCardType] = useState('');
    const [newCardNumber, setNewCardNumber] = useState('');
    const [newCreationDate, setNewCreationDate] = useState('');
    const [newStatus, setNewStatus] = useState('');

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDropDownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const navigate = useNavigate();
    const { openPopup } = usePopup();

    useEffect(() => {
        const storedOrganizations = JSON.parse(localStorage.getItem('organizations')) || [];
        const org = storedOrganizations.find((org) => org.id === parseInt(id));

        if (org) {
            setOrganizationData(org);
            setNewOrgName(org.name);
            setNewCardType(org.cardType);
            setNewCardNumber(org.cardNumber);
            setNewCreationDate(org.creationDate);
            setNewStatus(org.cardStatus);
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
    }, [id]);

    const handleUpdateOrganization = (e) => {
        e.preventDefault();

        const updatedOrg = {
            id: organizationData.id,
            name: newOrgName,
            cardType: newCardType,
            cardNumber: newCardNumber,
            creationDate: newCreationDate,
            cardStatus: newStatus,
        };

        const storedOrganizations = JSON.parse(localStorage.getItem('organizations')) || [];
        const orgIndexToUpdate = storedOrganizations.findIndex((org) => org.id === updatedOrg.id);

        if (orgIndexToUpdate !== -1) {
            const updatedOrganizations = [...storedOrganizations];
            updatedOrganizations[orgIndexToUpdate] = updatedOrg;
            localStorage.setItem('organizations', JSON.stringify(updatedOrganizations));
            navigate('/');
        }

        openPopup('Organization updated');
    };


    const cancelHandler = () => {
        navigate("/");
    }

    const mainStyle = {
        paddingLeft: isSidebarOpen ? '279px' : '0',
    };

    return (
        <>
            <div className={styles.formWrapper} style={mainStyle}>
                <MainNavigation toggleDropDown={() => setIsDropdownOpen(!isDropDownOpen)} />
                <div className="dropdown-container" ref={dropdownRef}>
                    <DropDownMenu isOpen={isDropDownOpen} />
                </div>
                <form onSubmit={handleUpdateOrganization}>
                    <div className={styles.formList}>
                        <div>
                            <input
                                type="text"
                                placeholder="Name"
                                id="orgName"
                                value={newOrgName}
                                onChange={(e) => setNewOrgName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <select
                                id="cardType"
                                onChange={(e) => setNewCardType(e.target.value)}
                                value={newCardType}
                                required
                            >
                                <option value="" disabled hidden>Card type</option>
                                <option value="Discount">Discount</option>
                                <option value="Cumulative">Cumulative</option>
                                <option value="Other">Other</option>
                            </select>
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
                                required
                            >
                                <option value="" disabled hidden>Status</option>
                                <option value="Active">Active</option>
                                <option value="Not ctive">Not active</option>
                            </select>
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

export default UpdateOrganization;

