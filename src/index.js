import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { PopupProvider } from "./components/PopupContext";
import './index.css';
import App from './App';

const root = document.getElementById('root');
const rootInstance = createRoot(root);
rootInstance.render(
    <Router>
        <PopupProvider>
            <App />
        </PopupProvider>
    </Router>
);






















// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import { BrowserRouter as Router } from 'react-router-dom';
// import './index.css';
// import App from './App';

// const root = document.getElementById('root');
// const rootInstance = createRoot(root);
// rootInstance.render(
//     <Router>
//         <App />
//     </Router>
// );


