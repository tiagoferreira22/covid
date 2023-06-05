import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import foto from '../assets/img/cachorro.jpg';

import Alert from 'react-bootstrap/Alert';

import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

import style from './InfoPatient.module.css';

export default function InfoPatient() {
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
                                Tiago Frreira de Almeida
                            </h3>
                            <img src={foto} alt="" />
                        </Card>
                        <Card
                            style={{
                                width: '30rem',
                                boxShadow: '2px 2px 10px #7d7d7d',
                                padding: '20px 30px',
                            }}
                        >
                            <Card.Body>
                                <Card.Subtitle className="mb-2 text-muted">
                                    <p><span>Criado em 03/06/2023 às 12:50:27</span></p>
                                    <p><span>Idade: 17 </span></p>
                                    <p><span>Data de nascimento: 06/01/2006</span></p>
                                    <p><span>CPF: 000.000.000-00</span></p>
                                    <p><span>Telefone: (00) 00000-0000</span></p>
                                    <p>
                                        <span>Status:</span>
                                    </p>
                                    <Alert variant="info">
                                        <p>Não atendido</p>
                                    </Alert>
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
