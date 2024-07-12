public class Imc
{
    public Aluno? aluno { get; set; }
	public string? AlunoId { get; set; } = Guid.NewGuid().ToString();
	public string? Nome { get; set; }
	public string? Sobrenome { get; set; }
    public string? Altura { get; set; }
    public string? Peso { get; set; }
    public string? IMC { get; set; }
    public string? IMCID { get; set; } = Guid.NewGuid().ToString();
    public string? Classificacao { get; set; } = "Magreza";
    public DateTime CriadoEm { get; set; } = DateTime.Now;
}