import { useEffect, useState } from "react";
import { Aluno } from "../models/Aluno";

function ListarAlunos() {
  const [imcs, setImc] = useState<Aluno[]>([]);

  useEffect(() => {
    carregarAlunos();
  }, []);

  function carregarAlunos() {
    //FETCH ou AXIOS
    fetch("http://localhost:5000/imc/listar")
      .then((resposta) => resposta.json())
      .then((aluno: Aluno[]) => {
        console.table(aluno);
        setImc(aluno);
      });
  }

    return (
            <div>
              <h1>Listar alunos:</h1>
              <table border={1}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>nome</th>
                    <th>sobrenome</th>
                  </tr>
                </thead>
                <tbody>
                  {imcs.map((aluno) => (
                    <tr key={aluno.alunoId}>
                      <td>{aluno.nome}</td>
                      <td>{aluno.sobrenome}</td>
                      <td>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
};

export default ListarAlunos;
