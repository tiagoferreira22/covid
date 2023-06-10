import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import { FaArrowLeft } from 'react-icons/fa';

import Alert from 'react-bootstrap/Alert';

import { Link, useParams } from 'react-router-dom';
import {useState, useEffect} from 'react'
import axios from 'axios'
import {format} from 'date-fns'

import style from './InfoPatient.module.css';

interface DataPatient {
    id: number;
    status: string;
    nome: string;
    cpf: string;
    telefone: string;
    dataNascimento: string;
    foto: string;
    created_at: string;
    updated_at: string;
}

const fotoBaseUrlImage = 'http://localhost:8000/api/';

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
            <>
        
            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Alert className="alertCenter" variant="secondary">
                    <p>Não há dados para serem exibidos! :/</p>
                </Alert>
            </div>
                <Link to={`/`}>
                    <div className={style.voltarHome} style={{marginLeft: '30px'}}>
                        <FaArrowLeft />
                    </div>
            </Link>
        </>
        )
    }

    //calcular a idade
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
        <Container className="mt-4">
            <h1>Ficha do paciente <span className={style.span}>{paciente.nome}</span></h1>
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

                        <Card style={{width: '30em'}}>
                            <Card.Body>
                                <Card.Img variant="top" src={fotoBaseUrlImage + paciente.foto}  style={{
                                    scale: '95%',
                                }}/>
                                <Card.Subtitle className='text-muted'>
                                    <p><span>Criado em {format(new Date(paciente.created_at), "dd/MM/yyyy 'às' HH:mm:ss")}</span></p>
                                    <p><span>Idade: {calcularIdade(paciente.dataNascimento)}</span></p>
                                    <p><span>Data de nascimento: {format(new Date(paciente.dataNascimento), "dd/MM/yyyy")}</span></p>
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
                                        <Alert className={style.alertCenter} variant="info">
                                            <p>Dados indisponíveis</p>
                                        </Alert>
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
