import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FaClinicMedical } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import style from './NavBar.module.css';
export default function NavBar() {
    return (
        <Navbar expand="lg" className={style.navbar}><Container><Link to={`/`} className='navbar-brand clinica'>{<FaClinicMedical />}</Link></Container></Navbar>
    );
}