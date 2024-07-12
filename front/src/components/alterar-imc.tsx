import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Imc } from "../models/imc";
import { Aluno } from "../models/Aluno";

function ImcAlterar() {
  const navigate = useNavigate();
  const { alunoID } = useParams();
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");

  useEffect(() => {
    if (alunoID) {
      fetch(`http://localhost:5225/api/aluno/buscar/${alunoID}`)
        .then((resposta) => resposta.json())
        .then((imc: Imc) => {
          setNome(imc.nome);
          setSobrenome(imc.sobrenome);
          setAltura(imc.altura);
          setPeso(imc.peso);
        });
    }
  }, []);

  function imcProduto(e: any) {
    const imc: Imc = {
      nome: nome,
      sobrenome: sobrenome,
      altura: altura,
      peso: peso,
      classificacao: "Magreza",
    };
    //FETCH ou AXIOS
    fetch(`http://localhost:5225/api/produto/alterar/${alunoID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(imc),
    })
      .then((resposta) => resposta.json())
      .then((imc: Imc) => {
        navigate("/pages/imc/listar");
      });
    e.preventDefault();
  }
  return (
    <div>
      <h1>Alterar IMC:</h1>
      <form onSubmit={imcProduto}>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          placeholder="Digite o nome"
          onChange={(e: any) => setNome(e.target.value)}
          required
        />
        <br />
        <label>Sobrenome:</label>
        <input
          type="text"
          value={sobrenome}
          placeholder="Digite o sobrenome"
          onChange={(e: any) => setSobrenome(e.target.value)}
        />
        <br />
        <label>Altura:</label>
        <input
          type="text"
          value={altura}
          placeholder="Digite a altura"
          onChange={(e: any) => setAltura(e.target.value)}
        />
        <br />
        <label>Peso:</label>
        <input
          type="text"
          value={peso}
          placeholder="Digite peso"
          onChange={(e: any) => setPeso(e.target.value)}
        />
        <br />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default ImcAlterar;