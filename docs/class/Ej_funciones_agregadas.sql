/*
El ingreso total recibido por cada actor, 
sin importar en cuantas películas haya participado.
*/

-- Query

SELECT nombre, SUM(sueldo) AS 'Ingreso total'
FROM Elenco
GROUP BY nombre
ORDER BY SUM(sueldo) DESC;


/*
El monto total destinado a películas por cada Estudio Cinematográfico, 
durante la década de los 80's.
*/

-- Query

SELECT nomestudio, SUM(presupuesto) AS 'Monto total'
FROM Pelicula
WHERE año >= 1980 AND año < 1990
GROUP BY nomestudio
ORDER BY SUM(presupuesto) DESC;

/*
 Nombre y sueldo promedio de los actores 
 (sólo hombres) que reciben en promedio un 
 pago superior a 5 millones de dolares por película.
*/

-- Query

SELECT a.nombre, AVG(e.sueldo) AS 'Sueldo Promedio'
FROM Actor a, Elenco e
WHERE a.nombre = e.nombre AND a.sexo = 'M'
GROUP BY a.nombre
HAVING AVG(e.sueldo) > 5000000
ORDER BY AVG(e.sueldo) DESC;


/*
Título y año de producción de las películas con menor presupuesto. 
(Por ejemplo, la película de Titanic se ha producido en varias veces 
entre la lista de películas estaría la producción de Titanic y el año 
que fue filmada con menor presupuesto).
*/

-- Query

SELECT titulo, año, MIN(presupuesto) AS 'Presupuesto'
FROM Pelicula
GROUP BY titulo
HAVING presupuesto = MIN(presupuesto)
ORDER BY presupuesto DESC


/*
 Mostrar el sueldo de la actriz mejor pagada.
*/

-- Query
SELECT MAX(sueldo) AS 'Salario'
FROM actor a, elenco e
WHERE a.nombre = e.nombre AND a.sexo = 'F';


