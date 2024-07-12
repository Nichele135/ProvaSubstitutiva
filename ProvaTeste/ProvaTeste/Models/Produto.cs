using System.ComponentModel.DataAnnotations;

namespace ProvaTeste.Models;

public class Produto
{
    //Construtores
    public Produto()
    {
        Id = Guid.NewGuid().ToString();
        CriadoEm = DateTime.Now;
    }

    public Produto
        (string nome, string descricao,
        double valor)
    {
        Nome = nome;
        Descricao = descricao;
        Valor = valor;
        Id = Guid.NewGuid().ToString();
        CriadoEm = DateTime.Now;
    }

    //Características - Atributos e propriedades
    //Validação - Data Annotations em C#
    //using System.ComponentModel.DataAnnotations;
    public string? Id { get; set; }

    [Required(ErrorMessage = "Campo obrigatório!")]
    public string? Nome { get; set; }

    [MinLength(3, ErrorMessage = "Mínimo 3 caracteres!")]
    [MaxLength(10, ErrorMessage = "Máximo 10 caracteres!")]
    public string? Descricao { get; set; }

    [Range(1, 1000, ErrorMessage = "Valor entre 1 e 1000!")]
    public double Valor { get; set; }
    public DateTime CriadoEm { get; set; }
    public int Quantidade { get; set; }
    public string? CategoriaId { get; set; }
    public Categoria? Categoria { get; set; }
}