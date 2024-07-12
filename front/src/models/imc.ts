import { Aluno } from "./Aluno";

export interface Imc {
  aluno?: Aluno  
  alunoID?: string;
  nome: string;
  sobrenome: string;

  altura: string;
  peso: string;
  classificacao: string;
  criadoEm?: string;

}