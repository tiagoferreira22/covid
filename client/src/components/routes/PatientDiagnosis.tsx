import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import style from './PatientDiagnosis.module.css';
import { format } from 'date-fns';
import Button from 'react-bootstrap/Button';

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

function PatientDiagnosis() {
  const history = useNavigate();

  const [dadosSaude, setDadosSaude] = useState({
    temperatura: '',
    pressaoSistolica: '',
    pressaoDiastolica: '',
    frequenciaRespiratoria: '',
  });

  const [sintomas, setSintomas] = useState({
    febre: false,
    coriza: false,
    narizentupido: false,
    cansaco: false,
    tosse: false,
    dorcabeca: false,
    dorcorpo: false,
    malestar: false,
    dorgarganta: false,
    dificuldaderespirar: false,
    faltapaladar: false,
    faltaolfato: false,
    dificuldadelocomocao: false,
    diarreia: false,
  });

  const handleEnviarDadosSaude = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const quantidadeSintomas = Object.values(sintomas).filter((value) => value).length;
    let novoStatus = '';

    if (quantidadeSintomas >= 0 && quantidadeSintomas <= 6) {
      novoStatus = 'sintomas_insuficientes';
    } else if (quantidadeSintomas >= 7 && quantidadeSintomas <= 9) {
      novoStatus = 'potencial_infectado';
    } else {
      novoStatus = 'possivel_infectado';
    }
    axios.patch(`http://localhost:8000/api/pacientes/${id}`, {
      status: novoStatus,
    });

    axios
      .post('http://localhost:8000/api/diagnostico', {
        pacienteId: id,
        temperatura: dadosSaude.temperatura,
        pressaoSistolica: dadosSaude.pressaoSistolica,
        pressaoDiastolica: dadosSaude.pressaoDiastolica,
        frequenciaRespiratoria: dadosSaude.frequenciaRespiratoria,
        ...sintomas,
      })
      .then(() => {
        axios
          .patch(`http://localhost:8000/api/pacientes/${id}`, {
            status: novoStatus,
          })
          .then(() => {
            history(`/infopaciente/${id}`);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { id } = useParams<{ id: string }>();
  const [paciente, setPaciente] = useState<DataPatient | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/paciente/${id}`)
      .then((response) => {
        setPaciente(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!paciente) {
    return (
      <Alert className="alertCenter" variant="secondary">
        <p>Não há dados para serem exibidos! :/</p>
      </Alert>
    );
  }

  if (paciente.status !== 'sem_diagnostico') {
    return (
      <>
        <div className="container">
          <Alert className="alertCenter" variant="warning" style={{ width: '100%' }}>
            <p>Você não pode realizar outro diagnóstico!. Podera editar o diagnóstico em editar</p>
          </Alert>
        </div>
        <Link to={`/`}>
          <div className={style.voltarHome} style={{ marginLeft: '30px' }}>
            <FaArrowLeft />
          </div>
        </Link>
      </>
    );
  }

  return (
    <Container className="mt-4">
      <h1>Análise Diagnóstica de <span className={style.span}>{paciente.nome}</span></h1>
      <hr></hr>

      <div className="col-md-12">
        <Card style={{ marginBottom: '20px', boxShadow: '2px 2px 10px #7d7d7d', padding: '20px', }} >
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">Criado em {format(new Date(paciente.created_at), "dd/MM/yyyy 'às' HH:mm:ss")}</Card.Subtitle>
            <br></br>
            <div className="row">
              <div className="col-md-6">
                <Form>
                  <Form.Group controlId="fullName">
                    <Form.Label>Nome Completo</Form.Label>
                    <Form.Control type="text" value={paciente.nome} disabled readOnly />
                  </Form.Group>

                  <Form.Group controlId="cpf">
                    <Form.Label>CPF</Form.Label>
                    <Form.Control type="text" value={paciente.cpf} disabled readOnly />
                  </Form.Group>

                  <Form.Group controlId="phoneNumber">
                    <Form.Label>Número de Telefone</Form.Label>
                    <Form.Control type="text" value={paciente.telefone} disabled readOnly />
                  </Form.Group>

                  <Form.Group controlId="dob">
                    <Form.Label>Data de Nascimento</Form.Label>
                    <Form.Control type="date" value={paciente.dataNascimento} disabled readOnly />
                  </Form.Group>
                </Form>
              </div>
              <div className="col-md-6" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }} >
                <img src={`http://localhost:8000/api/${paciente.foto}`} alt="" style={{ width: '450px', borderRadius: '5%', }} />
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
      <div className="col-md-12">
        <div className="col-md-12">
          <div className="diagnosticoDadosSaude">
            <Card style={{ width: '81rem', boxShadow: '5px 5px 10px #7d7d7d', padding: '20px', }} >
              <Card.Body>
                <div className={style.cardTitle}>
                  <div>
                    <Card.Title>Saúde do paciente</Card.Title>
                  </div>
                  <div>
                    <Card.Title>Sintomas</Card.Title>
                  </div>
                </div>
                <br></br>
                <div className="Card-text">
                  <Form id="formDados" onSubmit={handleEnviarDadosSaude}>
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Group className="mb-3">
                          <Form.Label>Temperatura:</Form.Label>
                          <Form.Control type="number" placeholder="Inserir temperatura" value={dadosSaude.temperatura} onChange={(e) => setDadosSaude({ ...dadosSaude, temperatura: e.target.value, }) } required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Pressão arterial sistólica:</Form.Label>
                          <Form.Control type="number" placeholder="Inserir pressão sistólica" value={dadosSaude.pressaoSistolica} onChange={(e) => setDadosSaude({ ...dadosSaude, pressaoSistolica: e.target.value, }) } required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Pressão arterial diastólica:</Form.Label>
                          <Form.Control type="number" placeholder="Inserir pressão diastólica" value={dadosSaude.pressaoDiastolica} onChange={(e) => setDadosSaude({ ...dadosSaude, pressaoDiastolica: e.target.value, }) } required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Frequência respiratória:</Form.Label>
                          <Form.Control type="number" placeholder="Inserir frequência respiratória" value={dadosSaude.frequenciaRespiratoria} onChange={(e) => setDadosSaude({ ...dadosSaude, frequenciaRespiratoria: e.target.value, }) } required />
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                        <Form.Check type="switch" id="febre" label="Febre" checked={sintomas.febre} onChange={(e) => setSintomas({ ...sintomas, febre: e.target.checked, }) } />
                        <Form.Check type="switch" id="coriza" label="Coriza" checked={sintomas.coriza} onChange={(e) => setSintomas({ ...sintomas, coriza: e.target.checked, }) } />
                        <Form.Check type="switch" id="narizentupido" label="Nariz Entupido" checked={sintomas.narizentupido} onChange={(e) => setSintomas({ ...sintomas, narizentupido: e.target.checked, }) } />
                        <Form.Check type="switch" id="cansaco" label="Cansaço" checked={sintomas.cansaco} onChange={(e) => setSintomas({ ...sintomas, cansaco: e.target.checked, }) } />
                        <Form.Check type="switch" id="tosse" label="Tosse" checked={sintomas.tosse} onChange={(e) => setSintomas({ ...sintomas, tosse: e.target.checked, }) } />
                        <Form.Check type="switch" id="dorcabeca" label="Dor de cabeça" checked={sintomas.dorcabeca} onChange={(e) => setSintomas({ ...sintomas, dorcabeca: e.target.checked, }) } />
                        <Form.Check type="switch" id="dorcorpo" label="Dores no corpo" checked={sintomas.dorcorpo} onChange={(e) => setSintomas({ ...sintomas, dorcorpo: e.target.checked, }) } />
                        <Form.Check type="switch" id="malestar" label="Mal estar geral" checked={sintomas.malestar} onChange={(e) => setSintomas({ ...sintomas, malestar: e.target.checked, }) } />
                        <Form.Check type="switch" id="dorgarganta" label="Dor de garganta" checked={sintomas.dorgarganta} onChange={(e) => setSintomas({ ...sintomas, dorgarganta: e.target.checked, }) } />
                        <Form.Check type="switch" id="dificuldaderespirar" label="Dificuldade para respirar" checked={sintomas.dificuldaderespirar} onChange={(e) => setSintomas({ ...sintomas, dificuldaderespirar: e.target.checked, }) } />
                        <Form.Check type="switch" id="faltapaladar" label="Falta de paladar" checked={sintomas.faltapaladar} onChange={(e) => setSintomas({ ...sintomas, faltapaladar: e.target.checked, }) } />
                        <Form.Check type="switch" id="faltaolfato" label="Falta de olfato" checked={sintomas.faltaolfato} onChange={(e) => setSintomas({ ...sintomas, faltaolfato: e.target.checked, }) } />
                        <Form.Check type="switch" id="dificuldadelocomocao" label="Dificuldade de locomoção" checked={sintomas.dificuldadelocomocao} onChange={(e) => setSintomas({ ...sintomas, dificuldadelocomocao: e.target.checked, }) } />
                        <Form.Check type="switch" id="diarreia" label="Diarréia" checked={sintomas.diarreia} onChange={(e) => setSintomas({ ...sintomas, diarreia: e.target.checked, }) } />
                      </div>
                    </div>
                    <Button variant="dark" type="submit">
                      Inserir dados
                    </Button>
                  </Form>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      <Link to={`/`}><div className={style.voltarHome}><FaArrowLeft /></div></Link>
    </Container>
  );
}
export default PatientDiagnosis;