var database = require("../database/config");
var mysql = require("mysql2");

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email)

    // busca o usuário que tenha exatamente esse e-mail e essa senha
    var instrucaoSql = `
        SELECT id, nome, email FROM usuario WHERE email = ${mysql.escape(email)} AND senha = ${mysql.escape(senha)};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Recebe os dados vindos do usuarioController.js e grava na tabela usuario
function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email);

    // mysql.escape() coloca as aspas e protege a query contra SQL Injection
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha) VALUES (${mysql.escape(nome)}, ${mysql.escape(email)}, ${mysql.escape(senha)});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar
};