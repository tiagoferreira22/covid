import { useState } from 'react';
import { IMaskInput } from 'react-imask';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import style from './ModalCadastroPaciente.module.css';

function ModalCadastro() {
  const [show, setShow] = useState(false);
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState<string | null>(null);
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [foto, setFoto] = useState<File | null>(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('dataNascimento', dataNascimento || ''); // Tratar como string vazia se for nulo
    formData.append('cpf', cpf);
    formData.append('telefone', telefone);
    if (foto) {
      formData.append('foto', foto);
    } else {
      formData.append('foto', '');
    }

    try {
      await axios.post('http://localhost:8000/api/paciente/', formData);
      window.location.reload();
    } catch (error: any) {
      if (error.response?.status === 422) {
        const errors = error.response?.data.errors;
        if (errors && errors.cpf) {
          alert('Este cpf é inválido, verifique os dados e tente novamente.');
        }
      } else {
        // Tratar outros erros
      }
    }

    handleClose();
  };

  return (
    <>
      <Button
        variant="warning"
        className={style.btnModal}
        onClick={handleShow}
        style={{
          transition: '0.5s',
        }}
      >
        Cadastrar paciente
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Inserir dados do paciente:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome completo</Form.Label>
              <Form.Control
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Inserir nome completo..."
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Data de nascimento</Form.Label>
              <Form.Control
                type="date"
                value={dataNascimento || ''}
                onChange={(e) => setDataNascimento(e.target.value || null)} // Converter string vazia em nulo
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>CPF</Form.Label>
              <Form.Control
                as={IMaskInput}
                type="text"
                name="cpf"
                value={cpf}
                onAccept={(value: string) => setCpf(value)}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="000.000.000-00"
                required
                mask="000.000.000-00"
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                as={IMaskInput}
                type="text"
                name="telefone"
                value={telefone}
                onAccept={(value: string) => setTelefone(value)}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="(00) 00000-0000"
                required
                mask="(00) 00000-0000"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Foto do Paciente</Form.Label>
              <Form.Control
                type="file"
                accept=".jpg, .jpeg, .png"
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFoto(file);
                  }
                }}
              />
            </Form.Group>
            <button
              type="submit"
              className={[style.btnModal, 'btn btn-warning'].join(' ')}
              style={{ marginTop: '10px', transition: '.5s' }}
            >
              Enviar
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalCadastro;
