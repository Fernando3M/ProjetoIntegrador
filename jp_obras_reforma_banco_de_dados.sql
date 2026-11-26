CREATE DATABASE IF NOT EXISTS jp_obras_reformas;
 
USE jp_obras_reformas;
 
CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    data_cadastro DATE NOT NULL DEFAULT (CURRENT_DATE)
);
 
CREATE TABLE prestador (
    id_prestador INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL UNIQUE,
    nome_profissional VARCHAR(100) NOT NULL,
    descricao_profissional VARCHAR(500),
    cidade VARCHAR(100),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);
 
CREATE TABLE servico (
    id_servico INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao VARCHAR(500)
);
 
CREATE TABLE prestador_servico (
    id_prestador INT NOT NULL,
    id_servico INT NOT NULL,
    PRIMARY KEY (id_prestador, id_servico),
    FOREIGN KEY (id_prestador) REFERENCES prestador(id_prestador),
    FOREIGN KEY (id_servico) REFERENCES servico(id_servico)
);
 
CREATE TABLE vaga (
    id_vaga INT AUTO_INCREMENT PRIMARY KEY,
    id_servico INT NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    descricao VARCHAR(500),
    cidade VARCHAR(100),
    data_publicacao DATE NOT NULL DEFAULT (CURRENT_DATE),
    FOREIGN KEY (id_servico) REFERENCES servico(id_servico)
);