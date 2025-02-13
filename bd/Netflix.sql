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

USE Netflix;

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

select * from Users;

CREATE TABLE Users_Movies (
id_userMovies INT NOT NULL auto_increment PRIMARY KEY,
FK_Users INT,
FK_Movies INT
);

CREATE TABLE Actors_Movies (
id_ActorsMovies INT NOT NULL auto_increment PRIMARY KEY,
FK_Actor INT,
FK_Movies INT
);

ALTER TABLE Users ADD column FK_Movies INT;
ALTER TABLE Users ADD foreign Key (FK_Movies) references Movies(idMovies);

ALTER TABLE Movies ADD column FK_Users INT;
ALTER TABLE Movies ADD foreign Key (FK_Users) references Users(idUser);

ALTER TABLE Users DROP FOREIGN KEY FK_Movies;
ALTER TABLE Users DROP COLUMN FK_Movies;

ALTER TABLE Movies DROP FOREIGN KEY FK_Users ;
ALTER TABLE Movies DROP COLUMN FK_Users;


ALTER TABLE Users ADD column Score FLOAT;
ALTER TABLE Users DROP COLUMN Score;

select * from users_movies;
select * from actors_movies;

ALTER TABLE Users_Movies ADD foreign Key (FK_Movies) references Movies(idMovies);
ALTER TABLE Users_Movies ADD foreign Key (FK_Users) references Users(idUser);

ALTER TABLE users_movies ADD column Score FLOAT;

INSERT INTO `netflix`.`users_movies` (`FK_Users`, `FK_Movies`, `Score`) VALUES ('1', '1', '8.5');
INSERT INTO `netflix`.`users_movies` (`FK_Users`, `FK_Movies`, `Score`) VALUES ('1', '2', '9');
INSERT INTO `netflix`.`users_movies` (`FK_Users`, `FK_Movies`, `Score`) VALUES ('3', '2', '9.75');

select * from users;

INSERT INTO `netflix`.`actors_movies` (`FK_Actor`, `FK_Movies`) VALUES ('1', '3');
INSERT INTO `netflix`.`actors_movies` (`FK_Actor`, `FK_Movies`) VALUES ('2', '2');
INSERT INTO `netflix`.`actors_movies` (`FK_Actor`, `FK_Movies`) VALUES ('3', '1');

select * from actors;



