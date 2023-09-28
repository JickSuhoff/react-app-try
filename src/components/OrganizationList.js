
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './OrganizationList.module.css';
import editIcon from '../images/edit.svg';
import deleteIcon from '../images/trash.svg';

const OrganizationList = ({ organizations, setOrganizations }) => {
    const [sortBy, setSortBy] = useState('idASC');
    const [searchQuery, setSearchQuery] = useState('');


    const handleDeleteOrganization = (orgId) => {
        const orgIndexToDelete = organizations.findIndex((org) => org.id === orgId);

        if (orgIndexToDelete !== -1) {
            const updatedOrganizations = [...organizations];
            updatedOrganizations.splice(orgIndexToDelete, 1);
            updatedOrganizations.forEach((org, index) => {
                org.id = index + 1;
            });
            setOrganizations(updatedOrganizations);
            localStorage.setItem('organizations', JSON.stringify(updatedOrganizations));
        }
    };

    const handleSortByChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const sortOptions = {
        idASC: (a, b) => a.id - b.id,
        idDESC: (a, b) => b.id - a.id,
        nameASC: (a, b) => a.name.localeCompare(b.name),
        nameDESC: (a, b) => b.name.localeCompare(a.name),
        dateASC: (a, b) => new Date(a.creationDate) - new Date(b.creationDate),
        dateDESC: (a, b) => new Date(b.creationDate) - new Date(a.creationDate),
    };

    const filteredAndSortedOrganizations = organizations
        .filter((org) => org.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort(sortOptions[sortBy]);

    const showSortAndSearch = organizations.length >= 3;

    return (
        <div className={styles.listWrapper}>
            <div className={styles.listNav}>
                {showSortAndSearch && (
                    <div className={styles.sortAndSearch}>
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            className={styles.searching}
                            onChange={handleSearchInputChange}
                        />
                        <select value={sortBy} onChange={handleSortByChange}>
                            <option value="idASC">Sort</option>
                            <option value="idDESC">Number - DESC</option>
                            <option value="nameASC">Name - ASC</option>
                            <option value="nameDESC">Name - DESC</option>
                            <option value="dateASC">Date - ASC</option>
                            <option value="dateDESC">Date - DESC</option>
                        </select>
                    </div>
                )}
                <NavLink to="/create-organization">Create Organization</NavLink>
            </div>
            <div className={styles.table}>
                <section className={styles.tableBody}>
                    <table>
                        <thead>
                            <tr className={styles.header}>
                                <th>№</th>
                                <th>Name</th>
                                <th>Card type</th>
                                <th>Card number</th>
                                <th>Creation Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAndSortedOrganizations.map((org) => (
                                <tr key={org.id}>
                                    <th>{org.id}</th>
                                    <th>{org.name}</th>
                                    <th>{org.cardType}</th>
                                    <th>{org.cardNumber}</th>
                                    <th>{org.creationDate}</th>
                                    <th>{org.cardStatus}</th>
                                    <th>
                                        <NavLink to={`/update-organization/${org.id}`}>
                                            <img src={editIcon} alt="editIcon" className={styles.listIcons} />
                                        </NavLink>
                                        <img
                                            src={deleteIcon}
                                            alt="deleteIcon"
                                            className={styles.listIcons}
                                            onClick={() => handleDeleteOrganization(org.id)}
                                        />
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
};

export default OrganizationList;






































