import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import foto from '../assets/img/cachorro.jpg';
import { FaArrowLeft } from 'react-icons/fa';

import Alert from 'react-bootstrap/Alert';

import { Link, useParams } from 'react-router-dom';
import {useState, useEffect} from 'react'
import axios from 'axios'

import style from './InfoPatient.module.css';

interface DataPatient {
    id: number;
    status: string;
    nome: string;
    cpf: string;
    telefone: string;
    dataNascimento: string;
    perfil: string;
}

export default function InfoPatient() {

    const { id } = useParams<{ id: string }>();
    const [paciente, setPaciente] = useState<DataPatient | null>(null);

    useEffect(() => {

        axios.get(`http://localhost:8000/api/paciente/${id}`)
            .then(response => {
                setPaciente(response.data);
            })
            .catch(error => {
                console.log(error)
            });
    }, []);

    if (!paciente) {
        return (
            <Alert className='alertCenter' variant="secondary">
                <p>Não há dados para serem exibidos! :/</p>
            </Alert>
        )
    }
    
    return (
        <Container className="mt-4">
            <h1>Informações do paciente</h1>
            <hr></hr>

            <div className="col-md-12">
                <div className={style.divInfo}>
                    <div
                        className="col-md-12"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '20px',
                        }}
                    >
                        <Card
                            style={{
                                width: '30rem',
                                boxShadow: '2px 2px 10px #7d7d7d',
                                padding: '20px 30px',
                                height: '500px',
                            }}
                        >
                            <h3
                                className={[
                                    style.Titulo,
                                    'mb-2 card-title',
                                ].join(' ')}
                                style={{
                                    fontWeight: 'bold'
                                }}
                            >
                                {paciente.nome}
                            </h3>
                            <img src={foto} alt="" />
                        </Card>
                        <Card
                            style={{
                                width: '30rem',
                                boxShadow: '2px 2px 10px #7d7d7d',
                                padding: '20px 30px',
                                height: '500px'
                            }}
                        >
                            <Card.Body >
                                <Card.Subtitle className="mb-2 text-muted"
                            style={{
                                display: 'felx',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                    <p><span>Criado em 03/06/2023 às 12:50:27</span></p>
                                    <p><span>Idade: 17 </span></p>
                                    <p><span>Data de nascimento: {paciente.dataNascimento}</span></p>
                                    <p><span>CPF: {paciente.cpf}</span></p>
                                    <p><span>Telefone: {paciente.telefone}</span></p>
                                    <p>
                                        <span>Status:</span>
                                    </p>
                                    {paciente.status === "sem_diagnostico" ? (
                                        <Alert className={style.alertCenter} variant="secondary">
                                            <p>Sem diagnostico</p>
                                        </Alert>
                                        ) : paciente.status === "sintomas_insuficientes" ? (
                                        <Alert className={style.alertCenter} variant="success">
                                        <p>Sintomas insuficientes</p>
                                        </Alert>
                                        ) : paciente.status === "potencial_infectado" ? (
                                        <Alert className={style.alertCenter} variant="warning">
                                        <p>Potencial infectado</p>
                                        </Alert>
                                        ) : paciente.status === "possivel_infectado" ? (
                                        <Alert className={style.alertCenter} variant="danger">
                                        <p>Possível infectado</p>
                                        </Alert>
                                        ) : (
                                            <p className='alertTable'><Alert variant="info">Dados indisponíveis</Alert></p>
                                        )}
                                </Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
            <Link to={`/`}>
                <div className={style.voltarHome}>
                    <FaArrowLeft />
                </div>
            </Link>
        </Container>
    );
}
