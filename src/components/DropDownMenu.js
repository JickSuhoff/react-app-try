import styles from "./DropDownMenu.module.css";
import { NavLink } from "react-router-dom";
import logoutIcon from "../images/sign-out.svg";
import usersIcon from "../images/users.svg";
import settingsIcon from "../images/settings.svg";

const DropDownMenu = ({ isOpen }) => {

    const currentRole = localStorage.getItem('userRole');



    return (
        <div className={`${isOpen ? styles.dropDown : styles.closed}`}>
            <div><img src={usersIcon} alt="usersIcon" />Current role: {currentRole}</div>
            <div><img src={settingsIcon} alt="settingsIcon" /><NavLink to="/change-role">Change role</NavLink></div>
            <span></span>
            <div><img src={logoutIcon} alt="logoutIcon" />Logout</div>
        </div>
    );
};

export default DropDownMenu;