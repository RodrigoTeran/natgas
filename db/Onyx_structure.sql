--
-- Base de datos: Onyx
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla client
--
CREATE DATABASE Onyx;
USE Onyx;

CREATE TABLE client (
  id VARCHAR(96) NOT NULL PRIMARY KEY,
  username VARCHAR(15),
  firstName VARCHAR(40) NOT NULL,
  lastName VARCHAR(40) NOT NULL,
  authProvider VARCHAR(40) NOT NULL,
  authProviderId VARCHAR(96) NOT NULL,
  sex CHAR(1),
  dateOfBirth DATE,
  imageId VARCHAR(96),
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla physicLevel
--

CREATE TABLE physicLevel (
  id VARCHAR(96) NOT NULL PRIMARY KEY,
  name varchar(40) NOT NULL
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla clientLevel
--

CREATE TABLE clientLevel (
  clientId VARCHAR(96) NOT NULL,
  physicLevelId VARCHAR(96) NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (clientId, physicLevelId)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla goal
--

CREATE TABLE goal (
  id VARCHAR(96) NOT NULL PRIMARY KEY,
  name VARCHAR(40) NOT NULL
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla clientGoal
--

CREATE TABLE clientGoal(
  clientId VARCHAR(96) NOT NULL,
  goalId VARCHAR(96) NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (clientId, goalId)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para las tablas de body
--

CREATE TABLE weight (
  id VARCHAR(96) NOT NULL PRIMARY KEY,
  clientId VARCHAR(96) NOT NULL,
  measurement FLOAT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE height(
  id VARCHAR(96) NOT NULL PRIMARY KEY,
  clientId VARCHAR(96) NOT NULL,
  measurement FLOAT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE neck (
  id VARCHAR(96) NOT NULL PRIMARY KEY,
  clientId VARCHAR(96) NOT NULL,
  measurement FLOAT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE chest (
  id VARCHAR(96) NOT NULL PRIMARY KEY,
  clientId VARCHAR(96) NOT NULL,
  measurement FLOAT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE leftArm (
  id VARCHAR(96) NOT NULL PRIMARY KEY,
  clientId VARCHAR(96) NOT NULL,
  measurement FLOAT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE rightArm (
  id VARCHAR(96) NOT NULL PRIMARY KEY,
  clientId VARCHAR(96) NOT NULL,
  measurement FLOAT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE leftForearm (
  id VARCHAR(96) NOT NULL PRIMARY KEY,
  clientId VARCHAR(96) NOT NULL,
  measurement FLOAT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE rightForearm (
  id VARCHAR(96) NOT NULL PRIMARY KEY,
  clientId VARCHAR(96) NOT NULL,
  measurement FLOAT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE waist (
  id VARCHAR(96) NOT NULL PRIMARY KEY,
  clientId VARCHAR(96) NOT NULL,
  measurement FLOAT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE hip (
  id VARCHAR(96) NOT NULL PRIMARY KEY,
  clientId VARCHAR(96) NOT NULL,
  measurement FLOAT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE leftLeg (
  id VARCHAR(96) NOT NULL PRIMARY KEY,
  clientId VARCHAR(96) NOT NULL,
  measurement FLOAT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE rightLeg (
  id VARCHAR(96) NOT NULL PRIMARY KEY,
  clientId VARCHAR(96) NOT NULL,
  measurement FLOAT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE rightCalve (
  id VARCHAR(96) NOT NULL PRIMARY KEY,
  clientId VARCHAR(96) NOT NULL,
  measurement FLOAT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE leftCalve (
  id VARCHAR(96) NOT NULL PRIMARY KEY,
  clientId VARCHAR(96) NOT NULL,
  measurement FLOAT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla journalEntry
--

CREATE TABLE journalEntry (
  id VARCHAR(96) NOT NULL PRIMARY KEY,
  aDate DATE NOT NULL,
  title VARCHAR(40) NOT NULL,
  content TEXT,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  clientId VARCHAR(96) NOT NULL
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla rol
--

CREATE TABLE rol (
  id VARCHAR(96) NOT NULL PRIMARY KEY,
  name VARCHAR(40) NOT NULL
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla clientRol
--

CREATE TABLE clientRol (
  clientId VARCHAR(96) NOT NULL,
  rolId VARCHAR(96) NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (clientId, rolId)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla service
--

CREATE TABLE service (
  id VARCHAR(96) NOT NULL PRIMARY KEY,
  name VARCHAR(40) NOT NULL
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla rolService
--

CREATE TABLE rolService (
  rolId VARCHAR(96) NOT NULL,
  serviceId VARCHAR(96) NOT NULL,
  PRIMARY KEY (rolId, serviceId)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla imagen
--

CREATE TABLE image (
  id VARCHAR(96) NOT NULL PRIMARY KEY,
  src TEXT NOT NULL
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla workoutImage
--

CREATE TABLE workoutImage (
  id VARCHAR(96) NOT NULL,
  idWorkout VARCHAR(96) NOT NULL,
  imageId VARCHAR(96) NOT NULL,
  PRIMARY KEY (id, idWorkout)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla workout
--

CREATE TABLE workout (
  id VARCHAR(96) NOT NULL PRIMARY KEY,
  name VARCHAR(40) NOT NULL,
  description TEXT,
  frequency INT NOT NULL,
  workoutLevelId VARCHAR(96),
  typeId VARCHAR(96) NOT NULL
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla clientWorkout
--

CREATE TABLE clientWorkout (
  clientId VARCHAR(96) NOT NULL,
  workoutId VARCHAR(96) NOT NULL,
  PRIMARY KEY (clientId, workoutId)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla workoutLevel
--

CREATE TABLE workoutLevel (
  id VARCHAR(96) NOT NULL PRIMARY KEY,
  name varchar(40) NOT NULL
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla workoutType
--

CREATE TABLE workoutType (
  id VARCHAR(96) NOT NULL PRIMARY KEY,
  name VARCHAR(40) NOT NULL
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla exercise
--

CREATE TABLE excercise (
  id VARCHAR(96) NOT NULL PRIMARY KEY,
  name VARCHAR(40) NOT NULL,
  description TEXT NOT NULL,
  imageId VARCHAR(96) NOT NULL
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla tag
--

CREATE TABLE tag (
  workoutId VARCHAR(96) NOT NULL,
  exerciseId VARCHAR(96) NOT NULL,
  PRIMARY KEY (workoutId, exerciseId)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla diet
--

CREATE TABLE diet (
  id VARCHAR(96) NOT NULL PRIMARY KEY,
  name VARCHAR(40) NOT NULL,
  calories FLOAT NOT NULL,
  macros JSON NOT NULL,
  micros JSON NOT NULL
);

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla clientDiet
--

CREATE TABLE clientDiet (
  clientId VARCHAR(96) NOT NULL,
  dietId VARCHAR(96) NOT NULL,
  PRIMARY KEY (clientId, dietId)
);


-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla ingredient
--

CREATE TABLE ingredient (
  id VARCHAR(96) NOT NULL PRIMARY KEY,
  name VARCHAR(40) NOT NULL,
  quantity FLOAT NOT NULL,
  unit VARCHAR(10) NOT NULL,
  dietId VARCHAR(96) NOT NULL
);


-- --------------------------------------------------------
-- LLAVES FORÁNEAS
-- --------------------------------------------------------

--
-- Llaves foráneas para la tabla client
--

ALTER TABLE client
ADD FOREIGN KEY (imageId) REFERENCES image(id);

-- --------------------------------------------------------

--
-- Llaves foráneas para la tabla clientLevel 
--

ALTER TABLE clientLevel
ADD FOREIGN KEY (clientId) REFERENCES client(id),
ADD FOREIGN KEY (physicLevelId) REFERENCES physicLevel(id);

-- --------------------------------------------------------

--
-- Llaves foráneas para la tabla clientGoal
--

ALTER TABLE clientGoal
ADD FOREIGN KEY (clientId) REFERENCES client(id),
ADD FOREIGN KEY (goalId) REFERENCES goal(id);

-- --------------------------------------------------------

--
-- Llaves foráneas para las tablas body
--

ALTER TABLE weight
ADD FOREIGN KEY (clientId) REFERENCES client(id);

ALTER TABLE height
ADD FOREIGN KEY (clientId) REFERENCES client(id);

ALTER TABLE neck
ADD FOREIGN KEY (clientId) REFERENCES client(id);

ALTER TABLE chest
ADD FOREIGN KEY (clientId) REFERENCES client(id);

ALTER TABLE leftArm
ADD FOREIGN KEY (clientId) REFERENCES client(id);

ALTER TABLE rightArm
ADD FOREIGN KEY (clientId) REFERENCES client(id);

ALTER TABLE leftForearm
ADD FOREIGN KEY (clientId) REFERENCES client(id);

ALTER TABLE rightForearm
ADD FOREIGN KEY (clientId) REFERENCES client(id);

ALTER TABLE waist
ADD FOREIGN KEY (clientId) REFERENCES client(id);

ALTER TABLE hip
ADD FOREIGN KEY (clientId) REFERENCES client(id);

ALTER TABLE leftLeg
ADD FOREIGN KEY (clientId) REFERENCES client(id);

ALTER TABLE rightLeg
ADD FOREIGN KEY (clientId) REFERENCES client(id);

ALTER TABLE rightCalve
ADD FOREIGN KEY (clientId) REFERENCES client(id);

ALTER TABLE leftCalve
ADD FOREIGN KEY (clientId) REFERENCES client(id);

-- --------------------------------------------------------

--
-- Llaves foráneas para la tabla journalEntry
--

ALTER TABLE journalEntry
ADD FOREIGN KEY (clientId) REFERENCES client(id);

-- --------------------------------------------------------

--
-- Llaves foráneas para la tabla clientRol
--

ALTER TABLE clientRol
ADD FOREIGN KEY (clientId) REFERENCES client(id),
ADD FOREIGN KEY (rolId) REFERENCES rol(id);

-- --------------------------------------------------------

--
-- Llaves foráneas para la tabla rolService
--

ALTER TABLE rolService
ADD FOREIGN KEY (rolId) REFERENCES rol(id),
ADD FOREIGN KEY (serviceId) REFERENCES service(id);

-- --------------------------------------------------------

--
-- Llaves foráneas para la tabla workoutImage
--

ALTER TABLE workoutImage
ADD FOREIGN KEY (idWorkout) REFERENCES workout(id),
ADD FOREIGN KEY (imageId) REFERENCES image(id);

-- --------------------------------------------------------

--
-- Llaves foráneas para la tabla workout
--

ALTER TABLE workout
ADD FOREIGN KEY (workoutLevelId) REFERENCES workoutLevel(id),
ADD FOREIGN KEY (typeId) REFERENCES workoutType(id);

-- --------------------------------------------------------

--
-- Llaves foráneas para la tabla clientWorkout
--

ALTER TABLE clientWorkout
ADD FOREIGN KEY (clientId) REFERENCES client(id),
ADD FOREIGN KEY (workoutId) REFERENCES workout(id);

-- --------------------------------------------------------

--
-- Llaves foráneas para la tabla excercise
--

ALTER TABLE excercise
ADD FOREIGN KEY (imageId) REFERENCES image(id);

-- --------------------------------------------------------

--
-- Llaves foráneas para la tabla tag
--

ALTER TABLE tag
ADD FOREIGN KEY (workoutId) REFERENCES workout(id),
ADD FOREIGN KEY (exerciseId) REFERENCES excercise(id);

-- --------------------------------------------------------

--
-- Llaves foráneas para la tabla clientDiet
--

ALTER TABLE clientDiet
ADD FOREIGN KEY (clientId) REFERENCES client(id),
ADD FOREIGN KEY (dietId) REFERENCES diet(id);


-- --------------------------------------------------------

--
-- Llaves foráneas para la tabla Ingredient
--

ALTER TABLE ingredient
ADD FOREIGN KEY (dietId) REFERENCES diet(id);

-- --------------------------------------------------------

--
-- Valores estáticos
--

INSERT INTO physicLevel(id, name) VALUES
('uuidPL001', 'Sedentario'),
('uuidPL002', 'Ejercicio 2 veces por semana'),
('uuidPL003', 'Caminata diaria'),
('uuidPL004', '4-5 días de gym'),
('uuidPL005', 'Alto rendimiento');

INSERT INTO goal(id, name) VALUES
('uuidG001', 'Subir de peso'),
('uuidG002', 'Mantener peso'),
('uuidG003', 'Bajar de peso');

INSERT INTO rol(id, name) VALUES
('uuidR01', 'Administrador'),
('uuidR02', 'Cliente');

INSERT INTO service(id, name) VALUES
('RF11', 'Consultar información de progreso'),
('RF12', 'Consultar dietas'),
('RF23', 'Editar dieta'),
('RF26', 'Editar ejercicio'),
('RF29', 'Editar rutina'),
('RF07', 'Añadir medidas corporales'),
('RF17', 'Consultar entradas bitácora'),
('RF28', 'Añadir rutina'),
('RF15', 'Consultar rutinas'),
('RF06', 'Editar información personal del perfil'),
('RF19', 'Editar entrada de bitácora'),
('RF22', 'Añadir dieta'),
('RF18', 'Añadir entrada a bitácora'),
('RF25', 'Añadir ejercicio'),
('RF09', 'Editar medidas corporales'),
('RF10', 'Eliminar medidas corporales'),
('RF08', 'Consultar medidas corporales'),
('RF32', 'Editar rol de un usuario'),
('RF13', 'Añadir/eliminar dieta a favoritos'),
('RF16', 'Añadir/eliminar rutina a favoritos'),
('RF20', 'Eliminar entrada de bitácora'),
('RF24', 'Eliminar dieta'),
('RF27', 'Eliminar ejercicio'),
('RF30', 'Eliminar rutina'),
('RF31', 'Consultar usuarios'),
('RF14', 'Consultar ejercicios'),
('RF21', 'Descargar entradas de bitácora'),
('RF05', 'Eliminar cuenta');

INSERT INTO rolService(rolId, serviceId) VALUES
('uuidR01', 'RF11'),
('uuidR02', 'RF11'),
('uuidR01', 'RF12'),
('uuidR02', 'RF12'),
('uuidR01', 'RF23'),
('uuidR01', 'RF26'),
('uuidR01', 'RF29'),
('uuidR01', 'RF07'),
('uuidR02', 'RF07'),
('uuidR01', 'RF17'),
('uuidR02', 'RF17'),
('uuidR01', 'RF28'),
('uuidR01', 'RF15'),
('uuidR02', 'RF15'),
('uuidR01', 'RF06'),
('uuidR02', 'RF06'),
('uuidR01', 'RF19'),
('uuidR02', 'RF19'),
('uuidR01', 'RF22'),
('uuidR01', 'RF18'),
('uuidR02', 'RF18'),
('uuidR01', 'RF25'),
('uuidR01', 'RF09'),
('uuidR02', 'RF09'),
('uuidR01', 'RF10'),
('uuidR02', 'RF10'),
('uuidR01', 'RF08'),
('uuidR02', 'RF08'),
('uuidR01', 'RF32'),
('uuidR01', 'RF13'),
('uuidR02', 'RF13'),
('uuidR01', 'RF16'),
('uuidR02', 'RF16'),
('uuidR01', 'RF20'),
('uuidR02', 'RF20'),
('uuidR01', 'RF24'),
('uuidR01', 'RF27'),
('uuidR01', 'RF30'),
('uuidR01', 'RF31'),
('uuidR01', 'RF14'),
('uuidR02', 'RF14'),
('uuidR01', 'RF21'),
('uuidR02', 'RF21'),
('uuidR01', 'RF05'),
('uuidR02', 'RF05');

INSERT INTO workoutLevel(id, name) VALUES
('uuidWL01', 'Principiante'),
('uuidWL02', 'Intermedio'),
('uuidWL03', 'Avanzado');

INSERT INTO workoutType(id, name) VALUES
('uuidWT001', 'Fuerza'),
('uuidWT002', 'Hipertrofia'),
('uuidWT003', 'Híbrido');

-- --------------------------------------------------------

--
-- Procedures
--

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
