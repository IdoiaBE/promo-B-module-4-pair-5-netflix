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