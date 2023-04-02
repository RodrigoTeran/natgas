-- INDEX.HTML

-- Consultar medida corporal
SELECT measurement
FROM ?, client
WHERE client.id = ?.clientid
AND client.id = ?;

-- Consultar medida corporal con fecha

SELECT measurement
FROM ?, client
WHERE client.id = ?.clientid
AND client.id = ?
AND ?.created_at BETWEEN ? AND ?;
