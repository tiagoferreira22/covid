import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ValidationCPF from '../form/ValidationCPF';
import ValidationPhone from '../form/ValidationPhone';

import axios from 'axios';
import { useForm } from 'react-hook-form';
import style from './ModalCadastroPaciente.module.css'

interface FormData {
    nome: string;
    cpf: string;
    telefone: string;
    dataNascimento: string;
    foto: File;
}

function Example() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const criarDado = async (data: FormData) => {
        try {
            const response = await axios.post(
                'http://localhost:8000/api/paciente/',
                data
            );
            console.log('Dado criado:', response.data);
        } catch (error) {
            console.error('Erro ao criar o dado:', error);
        }
    };

    const onSubmit = (data: FormData) => {
        criarDado(data);
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="warning" className={style.btnModal} onClick={handleShow } style={{
                transition: '0.5s'
            }}>
                Cadastra paciente
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <h4 className="modal-tilte">Inserir novo paciente</h4>
                </Modal.Header>
                <div className="modal-body">
                    <form action="" className="form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="" className="form-label">
                                Nome Completo
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Digite seu nome completo"
                                {...register('nome', { required: true })}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="" className="form-label">
                                CPF
                            </label>
                            <ValidationCPF
                                value=""
                                disabled={false}
                                validacao={true}
                                {...register('cpf', { required: true })}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="" className="form-label">
                                Telefone
                            </label>
                            <ValidationPhone
                                value=""
                                disabled={false}
                                {...register('telefone', { required: true })}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="" className="form-label">
                                Data de Nascimento
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                {...register('dataNascimento', {
                                    required: true,
                                })}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="" className="form-label">
                                Foto do paciente
                            </label>
                            <input
                                type="file"
                                className="form-control"
                                accept=".jpg,.jpeg,.png"
                                {...register('foto', { required: true })}
                            />
                        </div>
                        <button
                            type="submit"
                            className={[style.btnModal ,"btn btn-warning"].join(' ')}
                            style={{ marginTop: '10px', transition: '.5s' }}
                        >
                            Enviar
                        </button>
                    </form>
                </div>
            </Modal>
        </>
    );
}

export default Example;
