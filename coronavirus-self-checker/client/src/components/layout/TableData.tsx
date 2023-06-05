import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { FaEye, FaArrowRight, FaPen, FaTrash } from 'react-icons/fa';

//import FotoCaminho from '../assets/img/gato.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './TableData.module.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

interface Paciente {
    id: number;
    nome: string;
    cpf: string;
    telefone: string;
    dataNascimento: string;
    foto: string;
}

export default function TableData() {
    const dataAtual = new Date().getFullYear();
    const [paciente, setPaciente] = useState<Paciente[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/');
                const pacienteData: Paciente[] = response.data;
                setPaciente(pacienteData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Card style={{ width: '100%', boxShadow: '2px 2px 10px #e5e5e5' }}>
                <Card.Body>
                    <table className={[style.table, 'table'].join(' ')}>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nome</th>
                                <th scope="col">CPF</th>
                                <th scope="col">Idade</th>
                                <th scope="col">Diagnóstico</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {paciente.map((pacientes) => (
                                <tr key={pacientes.id}>
                                    <th scope="row">{pacientes.id}</th>
                                    <td>{pacientes.nome}</td>
                                    <td>{pacientes.cpf}</td>
                                    <td>{pacientes.dataNascimento}</td>
                                    <td>
                                        <Alert
                                            variant="secondary"
                                            className={style.alertDiagnostico}
                                        >
                                            Paciente Não Diagnósticado
                                        </Alert>
                                    </td>
                                    <td className={style.mr}>
                                        <Link to={`/infopaciente/`}>
                                            <Button variant="primary">
                                                <FaEye />
                                            </Button>
                                        </Link>
                                        <Link to={`/editionpaciente/`}>
                                            <Button variant="warning">
                                                <FaPen />
                                            </Button>
                                        </Link>
                                        <Button variant="danger">
                                            <FaTrash />
                                        </Button>
                                        <Link to={`/diagnosispatient/`}>
                                            <Button variant="success">
                                                <FaArrowRight />
                                            </Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card.Body>
            </Card>
        </>
    );
}
