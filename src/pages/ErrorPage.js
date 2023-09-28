import { NavLink } from "react-router-dom";
import styles from "./ErrorPage.module.css";

const ErrorPage = () => {
    return (
        <main className={styles.errorPageWrapper}>
            <h1>An Error occured</h1>
            <p>Could not find this page</p>
            <NavLink to="/">Main</NavLink>
        </main>
    )
};
export default ErrorPage;