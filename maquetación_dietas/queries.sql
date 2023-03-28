-- INDEX.HTML
-- Validar si es favorita
SELECT COUNT(dietId)
FROM clientDiet
WHERE clientId = ? -- 'uuidU001'
AND dietId = ?; -- 'uuidD001';


-- Top 3 dietas favoritas
SELECT d.id, d.name, d.calories, d.macros
FROM clientDiet cd, diet d
WHERE cd.dietId = d.id
AND cd.clientId = ? -- 'uuidU001'
LIMIT 3; 


-- Todas las dietas
SELECT id, name, calories, macros
FROM diet;

-- Calorias de las dietas registradas
SELECT DISTINCT calories
FROM diet;


-- Filtro dietas por calorias
SELECT id, name, calories, macros
FROM diet
WHERE calories = ?; -- 1500;

-- Filtro dietas por alimento
SELECT d.id, d.name, d.calories, d.macros
FROM diet d, ingredient i
WHERE i.dietId = d.id
AND i.name LIKE 'p%'
GROUP BY d.id;

-- Filtro dietas por calorias y alimento
SELECT d.id, d.name, d.calories, d.macros
FROM diet d, ingredient i
WHERE i.dietId = d.id
AND i.name LIKE '?%' -- 'p%
AND calories = ? -- 1500
GROUP BY d.id; 

-- DIETAS.HTML
-- Info detallada dieta
SELECT id, name, macros, micros
FROM diet
WHERE id = ?; -- 'uuidD001';

SELECT id, name, quantity, unit
FROM ingredient
WHERE dietId = ?; -- 'uuidD001';

-- DIETASFAVS.HTML
-- Todas las dietas favoritas
SELECT d.id, d.name, d.calories, d.macros
FROM clientDiet cd, diet d
WHERE cd.dietId = d.id
AND cd.clientId = ?; -- 'uuidU001'
