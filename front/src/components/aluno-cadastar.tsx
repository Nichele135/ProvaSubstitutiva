import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Aluno } from "../models/Aluno";

function AlunoCadastrar() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  useEffect(() => {
  }, []);


  function cadastrarProduto(e: any) {
    const aluno: Aluno = {
      nome: nome,
      sobrenome: sobrenome,
    };

    //FETCH ou AXIOS
    fetch("http://localhost:5225/api/imc/cadastrar", {method: "POST", headers: { "Content-Type": "application/json", },
      body: JSON.stringify(aluno),
    }) .then((resposta) => resposta.json()) .then((aluno: Aluno) => { navigate("/pages/produto/listar"); 


    });
    e.preventDefault();
  }
  return (
    <div>
      <h1>Cadastrar Aluno:</h1>
      <form onSubmit={cadastrarProduto}>
        <label>Nome:</label>
        <input
          type="text"
          placeholder="Digite o nome"
          onChange={(e: any) => setNome(e.target.value)}
          required
        />
        <br />
        <label>sobrenome:</label>
        <input
          type="text"
          placeholder="Digite o sobrenome"
          onChange={(e: any) => setSobrenome(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default AlunoCadastrar;