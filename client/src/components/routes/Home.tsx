import Modal from "../layout/modal/ModalCadastroPaciente";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import TableData from "../layout/TableData";
import style from "./Home.module.css";
import DarkMode from "../layout/DarkMode";

function Home() {
  return (
    <div className={style.Container}>
      <Container>
        <Container className="mb-3">
          <h1>
            Lista de <span>Pacientes</span>
          </h1>
          <Modal />
        </Container>
        <TableData />
      </Container>
    </div>
  );
}

export default Home;
