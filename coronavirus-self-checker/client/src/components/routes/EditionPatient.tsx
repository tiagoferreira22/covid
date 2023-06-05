import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ValidationCPF from './../form/ValidationCPF';

import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

import style from './EditionPatient.module.css';

import foto from '../assets/img/cachorro.jpg';
import ValidationPhone from '../form/ValidationPhone';
export default function EditionPatient() {
    return (
        <Container className="mt-4 mb-5">
            <h1>Editando informações de Tiago Ferreira De Almeida</h1>
            <hr></hr>

            <div className="col-md-12">
                <div className={style.divEdit} style={{
                    
                }}>
                    <Card style={{ width: '40rem', boxShadow: '2px 2px 10px #7d7d7d', padding: '20px'  }}>
                        <Card.Body>
                            <Card.Subtitle className="mb-2 text-muted">
                                Criado em 03/06/2023 às 12:50:27
                            </Card.Subtitle>
                            <br></br>
                            <Form>
                                <Form.Group controlId="fullName">
                                    <Form.Label>Nome Completo</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value="Tiago Ferreira De Almeida"
                                        placeholder="Digite seu nome completo"
                                    />
                                </Form.Group>

                                <Form.Group controlId="cpf">
                                    <Form.Label>CPF</Form.Label>
                                    <ValidationCPF
                                        value="491.448.230-45"
                                        disabled={false}
                                        validacao={true}
                                    />
                                </Form.Group>

                                <Form.Group controlId="phoneNumber">
                                    <Form.Label>Número de Telefone</Form.Label>

                                    <ValidationPhone
                                        value="(00) 00000-0000"
                                        disabled={false}
                                    />
                                </Form.Group>

                                <Form.Group controlId="dob">
                                    <Form.Label>Data de Nascimento</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value="2023-06-03"
                                    />
                                </Form.Group>

                                <Form.Group controlId="photo">
                                    <Form.Label>Foto do Paciente</Form.Label>
                                    <Form.Control
                                        type="file"
                                        accept=".jpg,.jpeg,.png"
                                    />
                                </Form.Group>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    style={{ marginTop: '10px' }}
                                >
                                    Enviar
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '20rem', boxShadow: '2px 2px 10px #7d7d7d', padding: '20px' }}>
                        <Card.Body>
                            <Card.Img variant="top" src={foto} />
                            <br></br>
                            <div className="card-text">
                                <p>Idade: 17 anos</p>
                                <p>Data de nascimento: 06/01/2006</p>
                                <p>CPF: 000.000.000-00</p>
                                <p>Telefone: (00) 00000-0000</p>
                            </div>
                        </Card.Body>
                    </Card>
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
