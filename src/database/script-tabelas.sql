-- =========================================================
-- NEURONIUM - SCRIPT DO BANCO DE DADOS (MySQL)
-- =========================================================
-- Arquivo de apoio: execute estes comandos no seu MySQL para
-- criar o banco e as tabelas que a API utiliza.
-- Ter este arquivo no projeto não cria as tabelas sozinho!
--
-- O nome do banco deve ser o mesmo de DB_DATABASE no .env.dev
-- =========================================================

CREATE DATABASE IF NOT EXISTS neuronium;

USE neuronium;

-- ---------------------------------------------------------
-- TABELA USUARIO
-- Usada pelas telas cadastro.html (INSERT) e login.html (SELECT)
--   nome  : mínimo de 3 caracteres (validado no front-end)
--   email : UNIQUE, não permite dois cadastros com o mesmo e-mail
--   senha : gravada em texto puro (decisão do projeto acadêmico)
-- ---------------------------------------------------------
CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(60) NOT NULL,
	email VARCHAR(100) NOT NULL,
	senha VARCHAR(50) NOT NULL,
	dtCadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT uq_usuario_email UNIQUE (email)
);

-- Consultas úteis para conferir os cadastros:
-- SELECT * FROM usuario;
-- SELECT id, nome, email FROM usuario WHERE email = 'seuemail@exemplo.com';
