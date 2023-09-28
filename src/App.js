import React from "react";
import { Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import CreateOrganization from './components/CreateOrganization';
import ErrorPage from './pages/ErrorPage';
import UpdateOrganization from "./components/UpdateOrganization";
import ChangeRole from "./components/ChangeRole";


function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/create-organization" element={<CreateOrganization />} />
                <Route path="/update-organization/:id" element={<UpdateOrganization />} />
                <Route path="/change-role" element={<ChangeRole />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </div>
    );
}

export default App;
