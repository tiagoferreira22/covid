import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Outlet } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';

function App() {
    return (
        <>
            <NavBar />
                <Outlet />
            <Footer />
        </>
    );
}

export default App;
