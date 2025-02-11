CREATE DATABASE Netflix;
USE Netflix;
CREATE TABLE Movies (
idMovies int auto_increment not null primary key,
title varchar(45) not null,
genre varchar(45) not null,
image varchar (1000) not null,
category varchar(45) not null,
year int 
);

DESCRIBE Movies;

CREATE TABLE Users (
idUser int auto_increment not null primary key,
user varchar(45) not null,
password varchar(45) not null,
name varchar(45) not null,
email varchar(45) not null,
plan_details varchar(45) not null
);

CREATE TABLE Actors (
idActor int auto_increment not null primary key,
name varchar(45) not null,
lastname varchar(45) not null,
country varchar(45) not null,
birthday date
);

ALTER TABLE Movies MODIFY image TEXT NOT NULL;
ALTER TABLE Actors ADD image text;

INSERT INTO Movies (title, genre, image, category, year)
VALUES ('Pulp Fiction', 'Crimen', 'https://pics.filmaffinity.com/pulp_fiction-210382116-large.jpg', 'Top 10', 1994),
('La vita è bella', 'Comedia', 'https://pics.filmaffinity.com/la_vita_e_bella-646167341-mmed.jpg', 'Top 10', 1996),
('Forrest Gump', 'Comedia', 'https://pics.filmaffinity.com/forrest_gump-212765827-mmed.jpg', 'Top 10', 1994);

INSERT INTO Users (user, password, name, email, plan_details)
VALUES ('laura_dev', 'laura', 'Laura', 'laura@gmail.com', 'Standard'),
('maria_dev', 'maria', 'Maria', 'maria@gmail.com', 'Standard'),
('ester_dev', 'ester', 'Ester', 'ester@gmail.com', 'Standard');

INSERT INTO Actors (name, lastname, country, birthday)
VALUES ('Tom', 'Hanks', 'Estados Unidos', '1956-07-09'),
('Roberto', 'Benigni', 'Italia', '1952-10-27'),
('John', 'Travolta', 'Estados Unidos', '1954-02-18');



