import { useEffect, useState } from "react";
import { Imc } from "../models/imc";

function ListarImcs() {
  const [imcs, setImc] = useState<Imc[]>([]);

  useEffect(() => {
    carregarImcs();
  }, []);

  function carregarImcs() {
    //FETCH ou AXIOS
    fetch("http://localhost:5000/imc/listar")
      .then((resposta) => resposta.json())
      .then((imc: Imc[]) => {
        console.table(imc);
        setImc(imc);
      });
  }

    return (
            <div>
              <h1>Listar imc por aluno:</h1>
              <table border={1}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>nome</th>
                    <th>sobrenome</th>
                    <th>imc</th>
                  </tr>
                </thead>
                <tbody>
                  {imcs.map((imc) => (
                    <tr key={imc.alunoID}>
                      <td>{imc.nome}</td>
                      <td>{imc.sobrenome}</td>
                      <td>{imc.classificacao}</td>
                      <td>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
};

export default ListarImcs;
