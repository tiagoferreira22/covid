import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { FaEye, FaArrowRight, FaPen, FaTrash } from 'react-icons/fa';
import Modal from "../layout/modal/ModalCadastroPaciente";
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './TableData.module.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

interface Paciente {
    id: number;
    nome: string;
    cpf: string;
    telefone: string;
    dataNascimento: string;
    status: string;
    foto: string;
}

export default function TableData() {
    const history = useNavigate();
    const [paciente, setPaciente] = useState<Paciente[]>([]);
    const { id } = useParams();

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

    useEffect(() => {
        const findPaciente = async () => {
          if (id) {
            try {
              const response = await axios.get(`http://localhost:8000/api/paciente/${id}`);
              setPaciente(response.data);
            } catch (error) {
              console.log(error);
            }
          }
        };
      
        findPaciente();
      }, [id]);

        const deletePaciente = async (id:number) => {

            const deleteComfirmacao = confirm('Tem certeza que quer deletar esse paciente?')

          if (deleteComfirmacao) {
            try {
                await axios.delete(`http://localhost:8000/api/paciente/${id}`);
                const response = await axios.get(`http://localhost:8000/api/`);
                setPaciente(response.data);
                history("/");
            } catch (error) {
              console.log(error);
            }
          }
        };
      
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
        <>
            <Card style={{ width: '100%', boxShadow: '2px 2px 10px #e5e5e5' }}>
                <Card.Body>
                    {
                        paciente.length === 0 ? (
                            <div className={[style.divZeroCadastro, 'col-md-12 row'].join()}>
                                <div className={style.conteudoZeroCadastro}>
                                        <div className={style.conteudoCimaFoto}>
                                            <p>Pelo Visto você não tem nenhum cadastro registrado</p>
                                            <Modal />
                                        </div>
                                </div>                               
                            </div>
                        ) : (
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
                                    {paciente.slice().reverse().map((pacientes:any, indentificacao:number) => (
                                        <tr key={pacientes.id}>
                                            <th scope="row">{indentificacao + 1}</th>
                                            <td style={{textTransform: 'capitalize'}}>{pacientes.nome}</td>
                                            <td>{pacientes.cpf}</td>
                                            <td>{calcularIdade(pacientes.dataNascimento)}</td>
                                            {pacientes.status === "sem_diagnostico" ? (
                                                <td className='alertTable'><Alert className={style.alertDiagnostico} variant="secondary">Não diagnosticado</Alert></td>
                                            ) : pacientes.status === "sintomas_insuficientes" ? (
                                                <td className='alertTable'><Alert className={style.alertDiagnostico} variant="success">Sintomas insuficientes</Alert></td>
                                            ) : pacientes.status === "potencial_infectado" ? (
                                                <td className='alertTable'><Alert className={style.alertDiagnostico} variant="warning">Potencial Infectado</Alert></td>
                                            ) : pacientes.status === "possivel_infectado" ? (
                                                <td className='alertTable'><Alert className={style.alertDiagnostico} variant="danger">Possível infectado</Alert></td>
                                            ) : (
                                                <td className='alertTable'><Alert className={style.alertDiagnostico} variant="info">Dados indisponíveis</Alert></td>
                                            )}
                                            <td className={style.mr}>
                                                <Link to={`/infopaciente/${pacientes.id}`}> <Button variant="primary"> <FaEye /> </Button> </Link>
                                                <Link to={`/editionpaciente/${pacientes.id}`}> <Button variant="warning"> <FaPen /> </Button> </Link>
                                                
                                                <Link to="#" onClick={() => deletePaciente(pacientes.id)}> <Button variant="danger"> <FaTrash /> </Button> </Link>
                                                <Link to={`/diagnosispatient/${pacientes.id}`}> <Button variant="success"> <FaArrowRight /> </Button> </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )
                    }
                </Card.Body>
            </Card>
        </>
    );
}
