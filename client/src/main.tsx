import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//paginas
import Home from './components/routes/Home.tsx';
import InfoPatient from './components/routes/InfoPatient.tsx';
import EditionPatient from './components/routes/EditionPatient.tsx';
import PatientDiagnosis from './components/routes/PatientDiagnosis.tsx';


const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/infopaciente/:id',
                element: <InfoPatient />
            },
            {
                path: '/editionpaciente/:id',
                element: <EditionPatient />
            },
            {
                path: '/diagnosispatient/:id',
                element: <PatientDiagnosis />
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
