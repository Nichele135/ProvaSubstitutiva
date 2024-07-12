import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import ListarImcs from "./components/listar-imc";
import ListarAlunos from "./components/aluno-listar";
import ImcCadastrar from "./components/cadastrar-imc";
import AlunoCadastrar from "./components/aluno-cadastar";
import ImcAlterar from "./components/alterar-imc";

function App() {
  return (
    <div>
      <div>
        <BrowserRouter>
          <nav>
            <ul>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/pages/imc/listar"}>
                  Listar imcs{" "}
                </Link>
              </li>
              <li>
                <Link to={"/pages/aluno/listar"}>
                  Listar alunos{" "}
                </Link>
              </li>
              <li>
                <Link to={"/pages/imc/cadastar"}>
                  cadastar imc{" "}
                </Link>
              </li>
              <li>
                <Link to={"/pages/aluno/cadastrar"}>
                  Cadastrar aluno{" "}
                </Link>
              </li>
              <li>
                <Link to={"/pages/imc/alterar"}>
                  Cadastrar aluno{" "}
                </Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<ListarImcs />} />
            <Route
              path="/pages/imc/listar"
              element={<ListarImcs />}
            />
            <Route
              path="/pages/imc/aluno-listar"
              element={<ListarAlunos />}
            />
            <Route
              path="/pages/imc/cadastar"
              element={<ImcCadastrar />}
            />
            <Route
              path="/pages/aluno/cadastrar"
              element={<AlunoCadastrar />}
            />
            <Route
              path="/pages/imc/alterar"
              element={<ImcAlterar />}
            />
            
          </Routes>
          <footer>
            <p>Andre Nichele</p>
          </footer>
        </BrowserRouter>
      </div>
    </div>
  );
}
export default App;