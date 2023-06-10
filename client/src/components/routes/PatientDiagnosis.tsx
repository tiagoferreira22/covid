import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

import style from './PatientDiagnosis.module.css';
import foto from '../assets/img/cachorro.jpg';

interface DataPatient {
    id: number;
    status: string;
    nome: string;
    cpf: string;
    telefone: string;
    dataNascimento: string;
    perfil: string;
}

function PatientDiagnosis() {

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
            <h1>Análise Diagnóstica de <span className={style.span}>{paciente.nome}</span></h1>
            <hr></hr>

            <div className="col-md-12">
                <Card style={{ marginBottom: '20px', boxShadow: '2px 2px 10px #7d7d7d', padding: '20px' }}>
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">
                            Criado em 03/06/2023 às 12:50:27
                        </Card.Subtitle>
                        <br></br>
                        <div className="row">
                            <div className="col-md-6">
                                <Form>
                                    <Form.Group controlId="fullName">
                                        <Form.Label>Nome Completo</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={paciente.nome}
                                            disabled
                                            readOnly
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="cpf">
                                        <Form.Label>CPF</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={paciente.cpf}
                                            disabled
                                            readOnly
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="phoneNumber">
                                        <Form.Label>
                                            Número de Telefone
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={paciente.telefone}
                                            disabled
                                            readOnly
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="dob">
                                        <Form.Label>
                                            Data de Nascimento
                                        </Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={paciente.dataNascimento}
                                            disabled
                                            readOnly
                                        />
                                    </Form.Group>
                                </Form>
                            </div>
                            <div
                                className="col-md-6"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <img
                                    src={foto}
                                    alt=""
                                    style={{
                                        width: '200px',
                                        borderRadius: '100%',
                                    }}
                                />
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>

            <div className="col-md-12">
                <div className={style.divDiag}>
                    <Card style={{ width: '100rem', boxShadow: '5px 5px 10px #7d7d7d', padding: '20px' }}>
                        <Card.Body>
                            <div className={style.cardTitle}>
                                <Card.Title>Saúde do paciente</Card.Title>
                                <Card.Title>Sintomas</Card.Title>
                            </div>
                            <div className={style.forms}>
                                <div className="col-md-6">
                                    <Form>
                                        <Form.Group controlId="fullName">
                                            <Form.Label>
                                                Pressão Arterial(PA)
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Digite sua Pressão Arterial"
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="fullName">
                                            <Form.Label>
                                                Frequência Cardíaca(FC)
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Digite sua Frequência Cardíaca"
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="fullName">
                                            <Form.Label>
                                                Frequência Respitatória(FR)
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Digite sua Frequência Respitatória"
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="fullName">
                                            <Form.Label>
                                                Temperatura(T)
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Digite sua Temperatura"
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
                                </div>

                                <div className="col-md-6">
                                    <Form>
                                        <Form.Check
                                            type="switch"
                                            label="Febre"
                                        />
                                        <Form.Check
                                            type="switch"
                                            label="Coriza"
                                        />
                                        <Form.Check
                                            type="switch"
                                            label="Nariz Entupido"
                                        />
                                        <Form.Check
                                            type="switch"
                                            label="Cansaço"
                                        />
                                        <Form.Check
                                            type="switch"
                                            label="Tosse"
                                        />
                                        <Form.Check
                                            type="switch"
                                            label="Dor de cabeça"
                                        />
                                        <Form.Check
                                            type="switch"
                                            label="Dores no corpo"
                                        />
                                        <Form.Check
                                            type="switch"
                                            label="Mal estar geral"
                                        />
                                        <Form.Check
                                            type="switch"
                                            label="Dor de garganta"
                                        />
                                        <Form.Check
                                            type="switch"
                                            label="Dificuldade de respirar"
                                        />
                                        <Form.Check
                                            type="switch"
                                            label="Falta de paladar"
                                        />
                                        <Form.Check
                                            type="switch"
                                            label="Falta de olfato"
                                        />
                                        <Form.Check
                                            type="switch"
                                            label="Dificuldade de locomoção"
                                        />
                                        <Form.Check
                                            type="switch"
                                            label="Diarréia"
                                        />
                                    </Form>
                                </div>
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

export default PatientDiagnosis;
