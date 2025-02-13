use Netflix;

SELECT * FROM Movies;

SELECT * FROM Movies WHERE year > 1990;

SELECT * FROM Movies WHERE category = 'Top 10';

UPDATE Movies SET year = 1997 WHERE idMovies = 2;

SELECT * FROM Actors;

SELECT * FROM Actors WHERE birthday BETWEEN '1950-01-01' and '1960-01-01';

SELECT name, lastname FROM Actors WHERE country = 'Estados Unidos';

SELECT * FROM Users WHERE plan_details = 'Standard';

DELETE FROM Users WHERE name like 'M%';

-- Cuantas pelis favoritas por usuario
SELECT users.name, count(FK_Movies) as numero_favoritas
FROM users inner join users_movies on users.idUser = users_movies.FK_Users
GROUP BY FK_Users;

-- Mostrar user con mayor cantidad de pelis favoritas
SELECT users.name, count(FK_Movies) as numero_favoritas
FROM users inner join users_movies on users.idUser = users_movies.FK_Users
GROUP BY FK_Users
HAVING numero_favoritas >1;

select * from users_movies;

