-- INDEX.HTML

-- Consultar medida corporal
SELECT measurement
FROM ?, client
WHERE client.id = ?.clientid
AND client.id = ?;
