import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MainNavigation from './MainNavigation';
import Footer from './Footer';
import Sidebar from './Sidebar';
import DropDownMenu from './DropDownMenu';
import styles from './ChangeRole.module.css';
import { usePopup } from './PopupContext';

const ChangeRole = () => {
    const [userName, setUserName] = useState('');
    const [selectedRole, setSelectedRole] = useState('Admin');

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDropDownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const navigate = useNavigate();
    const { openPopup } = usePopup();

    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        if (storedUserName) {
            setUserName(storedUserName);
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

    const handleUpdate = () => {
        localStorage.setItem('userName', userName);
        localStorage.setItem('userRole', selectedRole);
        navigate('/');
        openPopup('User updated');
    };

    const handleCancel = () => {
        navigate('/');
    };

    const mainStyle = {
        paddingLeft: isSidebarOpen ? '278px' : '0',
    };

    return (
        <>
            <div className={styles.changeRoleWrapper} style={mainStyle}>
                <MainNavigation toggleDropDown={() => setIsDropdownOpen(!isDropDownOpen)} />
                <div className="dropdown-container" ref={dropdownRef}>
                    <DropDownMenu isOpen={isDropDownOpen} />
                </div>
                <form>
                    <div className={styles.formList}>
                        <div>
                            <label>User Name</label>
                            <input
                                type="text"
                                placeholder="User Name"
                                id="userName"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>User role</label>
                            <select
                                id="userRole"
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                                required
                            >
                                <option value="Admin">Admin</option>
                                <option value="Editor">Editor</option>
                                <option value="User">User</option>
                            </select>
                        </div>
                    </div>
                </form>
                <div className={styles.chandeRoleButtons}>
                    <button onClick={handleCancel}>Cancel</button>
                    <button type="button" onClick={handleUpdate}>
                        Update
                    </button>
                </div>
                <span className={styles.restline}></span>
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            </div>
            <Footer toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        </>
    );
};

export default ChangeRole;







