import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ValidationCPF from './../form/ValidationCPF';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { FaArrowLeft } from 'react-icons/fa';

import style from './EditionPatient.module.css';

import foto from '../assets/img/cachorro.jpg';
import ValidationPhone from '../form/ValidationPhone';

interface DataPatient {
    id: number;
    status: string;
    nome: string;
    cpf: string;
    telefone: string;
    dataNascimento: string;
    perfil: string;
}

export default function EditionPatient() {

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

    function calcularIdade(dataNascimento: string): number {
        const hoje = new Date();
        const nascimento = new Date(dataNascimento);
      
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const diferencaMeses = hoje.getMonth() - nascimento.getMonth();
      
        if (
          diferencaMeses < 0 ||
          (diferencaMeses === 0 && hoje.getDate() < nascimento.getDate())
        ) {
          idade--;
        }
      
        return idade;
      }
      
    return (
        <Container className="mt-4 mb-5">
            <h1>Editando informações de Tiago Ferreira De Almeida</h1>
            <hr></hr>

            <div className="col-md-12">
                <div className={style.divEdit} style={{
                    
                }}>
                    <Card style={{ width: '40rem', boxShadow: '2px 2px 10px #7d7d7d', padding: '20px', height: '500px'  }}>
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
                                        value={paciente.nome}
                                        placeholder="Digite seu nome completo"
                                    />
                                </Form.Group>

                                <Form.Group controlId="cpf">
                                    <Form.Label>CPF</Form.Label>
                                    <ValidationCPF
                                        value={paciente.cpf}
                                        disabled={false}
                                        validacao={true}
                                    />
                                </Form.Group>

                                <Form.Group controlId="phoneNumber">
                                    <Form.Label>Número de Telefone</Form.Label>

                                    <ValidationPhone
                                        value={paciente.telefone}
                                        disabled={false}
                                    />
                                </Form.Group>

                                <Form.Group controlId="dob">
                                    <Form.Label>Data de Nascimento</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={paciente.dataNascimento}
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
                    <Card style={{ width: '20rem', boxShadow: '2px 2px 10px #7d7d7d', padding: '20px', height: '500px' }}>
                        <Card.Body>
                            <Card.Img variant="top" src={foto} />
                            <br></br>
                            <div className="card-text">
                                    <p>Idade: {calcularIdade(paciente.dataNascimento)} anos</p>
                                <p>Data de nascimento: {paciente.dataNascimento}</p>
                                <p>CPF: {paciente.cpf}</p>
                                <p>Telefone: {paciente.telefone}</p>
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
