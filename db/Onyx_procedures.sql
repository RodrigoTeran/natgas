USE Onyx;

DELIMITER //
    CREATE PROCEDURE agregarIngrediente(IN ingId VARCHAR(96), IN ingName VARCHAR(40), IN ingQuantity FLOAT, IN ingUnit VARCHAR(10), IN ingDietId VARCHAR(96))
    BEGIN
       	INSERT INTO ingredient(id, name, quantity, unit, dietId) VALUES(ingId, ingName, ingQuantity, ingUnit, ingDietId);
	END;
//

DELIMITER //
    CREATE PROCEDURE agregarDieta(IN dietId VARCHAR(96), IN dietName VARCHAR(40), IN dietCalories INT(11), IN dietMacros JSON, IN dietMicros JSON)
    BEGIN
       	INSERT INTO diet(id, name, calories, macros, micros) VALUES(dietId, dietName, dietCalories, dietMacros, dietMicros);
	END;
//

DELIMITER //
	CREATE PROCEDURE eliminarDieta(IN dId VARCHAR(96))
    BEGIN
    	DELETE FROM clientdiet
        WHERE dietId = dId;
        
        DELETE FROM ingredient
        WHERE dietId = dId;
        
        DELETE FROM diet
        WHERE id = dId;
    END;
//


CREATE PROCEDURE deleteEntry(IN `cId` VARCHAR(90) CHARSET utf8, IN `bId` VARCHAR(90) CHARSET utf8)
DELETE FROM journalEntry WHERE clientId = cId AND id = bId