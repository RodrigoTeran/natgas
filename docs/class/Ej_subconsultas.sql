-- Ejercicio: SQL con Sub-Consultas y Roles

/* ESQUEMA RELACIONAL
      Película (título, año, duración, encolor, presupuesto, nomestudio, idproductor)
      Elenco (título, año, nombre, sueldo)
      Actor (nombre, dirección, telefono, fechanacimiento, sexo)
      Productor (idproductor, nombre, dirección, teléfono)
      Estudio (nomestudio, dirección) */

/* Actrices de “Las brujas de Salem” */

-- Consulta tradicional
SELECT a.nombre
FROM elenco e, actor a
WHERE e.nombre = a.nombre
    AND sexo = 'F'
    AND titulo = 'Las brujas de Salem';

-- Consulta con subconsultas
SELECT nombre
FROM elenco
WHERE titulo = 'Las brujas de Salem'
      AND nombre IN (SELECT nombre
                        FROM actor
                        WHERE sexo = 'F');


/* Nombres de los actores que aparecen en películas producidas por MGM en 1995 */

-- Consulta tradicional
SELECT e.nombre
FROM elenco e, pelicula p
WHERE p.anio = 1995
      AND e.titulo = p.titulo
      AND e.anio = p.anio
      AND p.nomestudio = 'MGM';

-- Consulta con subconsultas
SELECT nombre
FROM elenco
WHERE titulo IN (SELECT titulo FROM pelicula 
                  WHERE anio = 1995 AND nomestudio = 'MGM');


/* Películas que duran más que “Lo que el viento se llevó” (de 1939) */

-- Consultas tradicionales
CREATE SYNONYM viento FOR pelicula;

SELECT p.titulo
FROM pelicula p, viento v
WHERE v.titulo = 'Lo que el viento se llevó'
      AND v.anio = 1939
      AND p.duracion > v.duracion;

SELECT p.titulo
FROM pelicula p, pelicula v -- Alias
WHERE v.titulo = 'Lo que el viento se llevó'
      AND v.anio = 1939
      AND p.duracion > v.duracion;

-- Consulta con subconsultas
SELECT titulo
FROM pelicula
WHERE duracion > (SELECT duracion
                  FROM pelicula
                  WHERE titulo = 'Lo que el viento se llevó'
                        AND anio = 1939);


/* Productores que han hecho más películas que George Lucas */

-- Consulta tradicional
      -- ¿CÓMO USAR HAVING SIN TENER LA FUNCIÓN AGREGADA EN EL SELECT?
CREATE SYNONYM georgeLucas FOR productor;
CREATE SYNONYM pelisLucas FOR peliculas;

SELECT pr.nombre -- , COUNT(pe.idproductor) AS 'Películas'
FROM pelicula pe, pelisLucas pl, georgeLucas gl, productor pr
WHERE pe.idproductor = pr.idproductor
      AND gl.nombre = 'George Lucas'
      AND gl.idproductor = pl.idproductor
-- GROUP BY pe.idproductor -- ¿ES NECESARIO?
HAVING COUNT(pe.idproductor) > COUNT(pl.idproductor);

-- Consulta con subconsultas
      -- ¿CÓMO USAR HAVING SIN TENER LA FUNCIÓN AGREGADA EN EL SELECT?
SELECT nombre
FROM productor p, pelicula pe
WHERE p.idproductor = pe.idproductor
HAVING COUNT(pe.idproductor) > (SELECT COUNT(pe.idproductor)
                                FROM pelicula pe, productor p
                                WHERE pe.idproductor = p.idproductor
                                    AND p.nombre = 'George Lucas');


/* Nombres de los productores de las películas en las que ha aparecido Sharon Stone */

-- Consulta tradicional
SELECT pr.nombre
FROM productor pr, pelicula pe, elenco e
WHERE pr.idproductor = pe.idproductor
      AND pe.titulo = e.titulo
      AND pe.anio = e.anio
      AND e.nombre = 'Sharon Stone';

-- Consulta con subconsultas
SELECT nombre
FROM productor
WHERE idproductor IN (SELECT pe.idproductor
                      FROM pelicula pe, elenco e
                      WHERE pe.titulo = e.titulo
                        AND pe.anio = e.anio
                        AND e.nombre = 'Sharon Stone');


/* Título de las películas que han sido filmadas más de una vez */

-- Consulta tradicional
SELECT titulo -- , COUNT(titulo) AS 'Grabaciones'
FROM pelicula
HAVING COUNT(titulo) > 1;

-- Consulta con subconsultas
SELECT titulo
FROM pelicula
WHERE COUNT(titulo) > (SELECT COUNT(titulo)
                        FROM pelicula
                        HAVING COUNT(titulo) = 1);

SELECT titulo
FROM pelicula
WHERE titulo NOT IN (SELECT titulo -- , COUNT(titulo)
                     FROM pelicula
                     HAVING COUNT(titulo) = 1);
