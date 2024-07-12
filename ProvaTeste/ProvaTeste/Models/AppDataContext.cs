using Microsoft.EntityFrameworkCore;
using ProvaTeste.Models;

//Classe que representa o EF dentro do projeto
public class AppDataContext : DbContext
{
    //Classes que vão representar as tabelas
    //no banco de dados
    public DbSet<Produto> Produtos { get; set; }
    public DbSet<Categoria> Categorias { get; set; }
    public DbSet<Aluno> Alunos { get; set; }
    public DbSet<Imc> Imcs { get; set; }

    //Configurando qual o banco de dados vai
    //ser utilizado
    //Configurando a string de conexão
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=AndreBd.db");
    }
}