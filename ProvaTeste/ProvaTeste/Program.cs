using System.ComponentModel.DataAnnotations;
using ProvaTeste.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

//Registrar o serviço de banco de dados na aplicação
builder.Services.AddDbContext<AppDataContext>();

//Configurar a política de CORS
builder.Services.AddCors(options =>
    options.AddPolicy("Acesso Total",
        configs => configs
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod())
);

var app = builder.Build();

//EndPoints - Funcionalidades
//GET: http://localhost:5225/
app.MapGet("/", () => "Prova subs");

//GET: http://localhost:5225/api/produto/listar

app.MapGet("/api/aluno/listar",
    ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Alunos.Any())
    {
        return Results.Ok(ctx.Alunos.ToList());
    }
    return Results.NotFound("Tabela vazia!");
});


//GET: http://localhost:5225/api/produto/buscar/id_do_produto
app.MapGet("/api/aluno/buscar/{alunoId}", ([FromRoute] string alunoId,
    [FromServices] AppDataContext ctx) =>
{
    //Expressão lambda em c#
    Aluno? aluno =
        ctx.Alunos.FirstOrDefault(x => x.AlunoId == alunoId);
    if (aluno is null)
    {
        return Results.NotFound("Produto não encontrado!");
    }
    return Results.Ok(aluno);
});

//POST: http://localhost:5225/api/produto/cadastrar
app.MapPost("/api/aluno/cadastrar",
    ([FromBody] Aluno aluno,
    [FromServices] AppDataContext ctx) =>
{
    //Validação dos atributos do produto
    List<ValidationResult> erros = new
        List<ValidationResult>();
    if (!Validator.TryValidateObject(
        aluno, new ValidationContext(aluno),
        erros, true))
    {
        return Results.BadRequest(erros);
    }

    //RN: Não permitir produtos com o mesmo nome
    Aluno? alunoBuscado = ctx.Alunos.
        FirstOrDefault(x => x.Nome == aluno.Nome && x.Sobrenome == aluno.Sobrenome);
    if (alunoBuscado is not null)
    {
        return Results.
            BadRequest("Já existe um produto com o mesmo nome!");
    }

    //Adicionar o produto dentro do banco de dados
    ctx.Alunos.Add(aluno);
    ctx.SaveChanges();
    return Results.Created("", aluno);
});


//PUT: http://localhost:5225/api/produto/alterar/id_do_produto
app.MapPut("/api/aluno/alterar/{alunoId}",
    ([FromRoute] string alunoId,
    [FromBody] Aluno alunoAlterado,
    [FromServices] AppDataContext ctx) =>
{
    Aluno? aluno = ctx.Alunos.Find(alunoId);
    if (aluno is null)
    {
        return Results.
            NotFound("Aluno não encontrado!");
    }
    aluno.Nome = alunoAlterado.Nome;
    aluno.Sobrenome = alunoAlterado.Sobrenome;

    ctx.Alunos.Update(aluno);
    ctx.SaveChanges();
    return Results.
        Ok("Aluno alterado com sucesso!");
});

//POST: http://localhost:5225/api/imc/cadastrar
app.MapPost("/api/imc/cadastrar",
    ([FromBody] Imc imc,
    [FromServices] AppDataContext ctx) =>
{

 if (!double.TryParse(imc.Peso, out double peso))
    {
        return Results.BadRequest("Peso inválido.");
    }
    if (!double.TryParse(imc.Altura, out double altura))
    {
        return Results.BadRequest("Altura inválida.");
    }

    double valorIMC = peso / (altura * altura);


    if (valorIMC < 18.5)
    {
        return Results.Ok("Abaixo do peso");
    }
    if (valorIMC >= 18.5 && valorIMC < 24.9)
    {
        return Results.Ok("Peso normal");
    }
    if (valorIMC >= 25 && valorIMC < 29.9)
    {
        return Results.Ok("Sobrepeso");
    }
    if (valorIMC >= 30 && valorIMC < 34.9)
    {
        return Results.Ok("Obesidade grau 1");
    }
    if (valorIMC >= 35 && valorIMC < 39.9)
    {
        return Results.Ok("Obesidade grau 2");
    }
    if (valorIMC >= 40)
    {
        return Results.Ok("Obesidade grau 3");
    }

 
    valorIMC.ToString();
    ctx.Imcs.Add(imc);
    ctx.SaveChanges();
    return Results.Created("", imc);
});

//GET: http://localhost:5225/api/imc/listar
app.MapGet("/api/imc/listar",
    ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Imcs.Any())
    {
        return Results.Ok(ctx.Imcs.ToList());
    }
    return Results.NotFound("Tabela vazia!");
});




//      Listar IMCs por aluno (eu acho que e assim).

app.MapGet("/api/imc/aluno/{alunoId}", 
    ([FromRoute] string alunoId, [FromServices] AppDataContext ctx) =>
{
    var imcsPorAluno = ctx.Imcs.Where(i => i.AlunoId == alunoId).ToList();
    
    if (imcsPorAluno.Any())
    {
        return Results.Ok(imcsPorAluno);
    }
    
    return Results.NotFound("Nenhum IMC encontrado!");
});


app.MapPut("/api/imc/alterar/{alunoId}",
    ([FromRoute] string alunoId,
    [FromBody] Imc imcAlterado,
    [FromServices] AppDataContext ctx) =>
{
    Imc? imc = ctx.Imcs.Find(alunoId);
    if (imc is null)
    {
        return Results.
            NotFound("Aluno não encontrado!");
    }
    imc.Nome = imcAlterado.Nome;
    imc.Sobrenome = imcAlterado.Sobrenome;
    imc.Altura = imcAlterado.Altura;
    imc.Peso = imcAlterado.Peso;

    ctx.Imcs.Update(imc);
    ctx.SaveChanges();
    return Results.
        Ok("Aluno alterado com sucesso!");
});

app.UseCors("Acesso Total");
app.Run();