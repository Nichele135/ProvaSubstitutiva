import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Imc } from "../models/imc";
import { Aluno } from "../models/Aluno";

function ImcCadastrar() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  useEffect(() => {
  }, []);


  function cadastrarProduto(e: any) {
    const imc: Imc = {
      nome: nome,
      sobrenome: sobrenome,
      altura: altura,
      peso: peso,
      classificacao: "Magreza"
    };

    //FETCH ou AXIOS
    fetch("http://localhost:5225/api/imc/cadastrar", {method: "POST", headers: { "Content-Type": "application/json", },
      body: JSON.stringify(imc),
    }) .then((resposta) => resposta.json()) .then((imc: Imc) => { navigate("/pages/produto/listar"); 


    });
    e.preventDefault();
  }
  return (
    <div>
      <h1>Cadastrar Imc:</h1>
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
        <br />
        <label>altura:</label>
        <input
          type="text"
          placeholder="Digite altura"
          onChange={(e: any) => setAltura(e.target.value)}
        />
        <br />
        <label>peso:</label>
        <input
          type="text"
          placeholder="Digite o peso"
          onChange={(e: any) => setPeso(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default ImcCadastrar;