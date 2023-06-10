import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import { FaArrowLeft } from 'react-icons/fa';
import style from './EditionPatient.module.css';
import {format} from 'date-fns'


interface DataPatient {
  id: number;
  status: string;
  nome: string;
  cpf: string;
  telefone: string;
  dataNascimento: string;
  foto: string;
}

const fotoBaseUrlImage = 'http://localhost:8000/api/';


export default function EditionPatient() {
  const { id } = useParams<{ id: string }>();
  const [paciente, setPaciente] = useState<DataPatient | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    dataNascimento: '',
    foto: null,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/paciente/${id}`)
      .then((response) => {
        setPaciente(response.data);
        setFormData({
          nome: response.data.nome,
          cpf: response.data.cpf,
          telefone: response.data.telefone,
          dataNascimento: response.data.dataNascimento,
          foto: null, // Defina o valor da foto conforme necessário
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .put(`http://localhost:8000/api/paciente/${id}`, formData)
      .then((response) => {
        console.log('Paciente atualizado com sucesso:', response.data);
        // Faça qualquer ação necessária após a atualização do paciente
      })
      .catch((error) => {
        console.log('Erro ao atualizar o paciente:', error);
        // Trate o erro conforme necessário
      });
  };

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
    );
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
      <h1>Ajustando ficha do paciente <span className={style.span}>{paciente.nome}</span></h1>
      <hr></hr>

      <div className="col-md-12">
        <div className={style.divEdit}>
          <Card style={{ width: '40rem', boxShadow: '2px 2px 10px #7d7d7d', padding: '20px', height: '650px' }}>
            <Card.Body>
              <br></br>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="fullName">
                  <Form.Label>Nome Completo</Form.Label>
                  <Form.Control
                    type="text"
                    name="nome"
                    value={formData.nome}
                    placeholder="Digite seu nome completo"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="cpf">
                  <Form.Label>CPF</Form.Label>
                  <Form.Control
                    type="text"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="phoneNumber">
                  <Form.Label>Número de Telefone</Form.Label>
                  <Form.Control
                    type="text"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="dob">
                  <Form.Label>Data de Nascimento</Form.Label>
                  <Form.Control
                    type="date"
                    name="dataNascimento"
                    value={formData.dataNascimento}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="photo">
                  <Form.Label>Foto do Paciente</Form.Label>
                  <Form.Control
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleChange}
                  />
                </Form.Group>
                <button
                    type="submit"
                    className={[style.btnEdit, 'btn btn-warning'].join(' ')}
                    style={{ marginTop: '10px', transition: '.5s' }}
                    >
                    Enviar
                </button>
              </Form>
            </Card.Body>
          </Card>
          <Card style={{ width: '23rem', boxShadow: '2px 2px 10px #7d7d7d', padding: '20px', height: '650px' }}>
            <Card.Body>
              <Card.Img variant="top" src={fotoBaseUrlImage + paciente.foto}
                                    alt=""
                                    onError={() => {
                                        console.log("Erro ao carregar a imagem");
                                    }} />
              <br></br>
              <div className="card-text">
                <p><span>Idade: </span>{calcularIdade(paciente.dataNascimento)} anos</p>
                <p><span>Data de nascimento: </span>{format(new Date(paciente.dataNascimento), "dd/MM/yyyy")}</p>
                <p><span>CPF: </span>{paciente.cpf}</p>
                <p><span>Telefone: </span>{paciente.telefone}</p>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div style={{
           marginTop: '20px',display: 'flex',justifyContent: 'center', alignItems:'center',
        }}>
        <Card style={{ width: '65em', boxShadow: '2px 2px 10px #e5e5e5', }}>
                <Card.Body>
                    <table className={[style.table, 'table'].join(' ')}>
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">CPF</th>
                                <th scope="col">Idade</th>
                                <th scope="col">Diagnóstico</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                                <tr key={paciente.id}>
                                    <td style={{textTransform: 'capitalize'}}>{paciente.nome}</td>
                                    <td>{paciente.cpf}</td>
                                    <td>{calcularIdade(paciente.dataNascimento)}</td>
                                    {paciente.status === "sem_diagnostico" ? (
                                        <td className='alertTable'><Alert className={style.alertDiagnostico} variant="secondary">Não diagnosticado</Alert></td>
                                    ) : paciente.status === "sintomas_insuficientes" ? (
                                        <td className='alertTable'><Alert className={style.alertDiagnostico} variant="success">Sintomas insuficientes</Alert></td>
                                    ) : paciente.status === "potencial_infectado" ? (
                                        <td className='alertTable'><Alert className={style.alertDiagnostico} variant="warning">Potencial Infectado</Alert></td>
                                    ) : paciente.status === "possivel_infectado" ? (
                                        <td className='alertTable'><Alert className={style.alertDiagnostico} variant="danger">Possível infectado</Alert></td>
                                    ) : (
                                        <td className='alertTable'><Alert className={style.alertDiagnostico} variant="info">Dados indisponíveis</Alert></td>
                                    )}
                                    <td className={style.mr}></td>
                                </tr>
                        </tbody>
                    </table>
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
