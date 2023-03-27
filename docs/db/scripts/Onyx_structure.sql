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
  id BINARY(16) NOT NULL PRIMARY KEY,
  username VARCHAR(15) NOT NULL,
  authProvider VARCHAR(40) NOT NULL,
  authProviderId BINARY(16) NOT NULL,
  sex CHAR(1) NOT NULL,
  dateOfBirth DATE NOT NULL,
  imageId BINARY(16),
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla physicLevel
--

CREATE TABLE physicLevel (
  id BINARY(16) NOT NULL PRIMARY KEY,
  name varchar(40) NOT NULL
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla clientLevel
--

CREATE TABLE clientLevel (
  clientId BINARY(16) NOT NULL,
  physicLevelId BINARY(16) NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (clientId, physicLevelId)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla goal
--

CREATE TABLE goal (
  id BINARY(16) NOT NULL PRIMARY KEY,
  name VARCHAR(40) NOT NULL
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla clientGoal
--

CREATE TABLE clientGoal(
  clientId BINARY(16) NOT NULL,
  goalId BINARY(16) NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (clientId, goalId)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para las tablas de body
--

CREATE TABLE weight (
  id BINARY(16) NOT NULL PRIMARY KEY,
  clientId BINARY(16) NOT NULL,
  measurement FLOAT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE height(
  id BINARY(16) NOT NULL PRIMARY KEY,
  clientId BINARY(16)NOT NULL,
  measurement FLOAT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE neck (
  id BINARY(16) NOT NULL PRIMARY KEY,
  clientId BINARY(16) NOT NULL,
  measurement FLOAT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE chest (
  id BINARY(16) NOT NULL PRIMARY KEY,
  clientId BINARY(16) NOT NULL,
  measurement FLOAT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE leftArm (
  id BINARY(16) NOT NULL PRIMARY KEY,
  clientId BINARY(16) NOT NULL,
  measurement FLOAT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE rightArm (
  id BINARY(16) NOT NULL PRIMARY KEY,
  clientId BINARY(16) NOT NULL,
  measurement FLOAT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE leftForearm (
  id BINARY(16) NOT NULL PRIMARY KEY,
  clientId BINARY(16) NOT NULL,
  measurement FLOAT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE rightForearm (
  id BINARY(16) NOT NULL PRIMARY KEY,
  clientId BINARY(16) NOT NULL,
  measurement FLOAT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE waist (
  id BINARY(16) NOT NULL PRIMARY KEY,
  clientId BINARY(16) NOT NULL,
  measurement FLOAT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE hip (
  id BINARY(16) NOT NULL PRIMARY KEY,
  clientId BINARY(16) NOT NULL,
  measurement FLOAT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE leftLeg (
  id BINARY(16) NOT NULL PRIMARY KEY,
  clientId BINARY(16) NOT NULL,
  measurement FLOAT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE rightLeg (
  id BINARY(16) NOT NULL PRIMARY KEY,
  clientId BINARY(16) NOT NULL,
  measurement FLOAT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE rightCalve (
  id BINARY(16) NOT NULL PRIMARY KEY,
  clientId BINARY(16) NOT NULL,
  measurement FLOAT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE leftCalve (
  id BINARY(16) NOT NULL PRIMARY KEY,
  clientId BINARY(16) NOT NULL,
  measurement FLOAT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla journalEntry
--

CREATE TABLE journalEntry (
  id BINARY(16) NOT NULL PRIMARY KEY,
  title VARCHAR(40) NOT NULL,
  content TEXT,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  clientId BINARY(16) NOT NULL
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla rol
--

CREATE TABLE rol (
  id BINARY(16) NOT NULL PRIMARY KEY,
  name VARCHAR(40) NOT NULL
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla clientRol
--

CREATE TABLE clientRol (
  clientId BINARY(16) NOT NULL,
  rolId BINARY(16) NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (clientId, rolId)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla service
--

CREATE TABLE service (
  id BINARY(16) NOT NULL PRIMARY KEY,
  name VARCHAR(40) NOT NULL
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla rolService
--

CREATE TABLE rolService (
  rolId BINARY(16) NOT NULL,
  serviceId BINARY(16) NOT NULL,
  PRIMARY KEY (rolId, serviceId)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla imagen
--

CREATE TABLE image (
  id BINARY(16) NOT NULL PRIMARY KEY,
  src TEXT NOT NULL
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla workoutImage
--

CREATE TABLE workoutImage (
  id BINARY(16) NOT NULL,
  idWorkout BINARY(16) NOT NULL,
  imageId BINARY(16) NOT NULL,
  PRIMARY KEY (id, idWorkout)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla workout
--

CREATE TABLE workout (
  id BINARY(16) NOT NULL PRIMARY KEY,
  name VARCHAR(40) NOT NULL,
  description TEXT,
  frequency INT NOT NULL,
  workoutLevelId BINARY(16),
  typeId BINARY(16) NOT NULL
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla clientWorkout
--

CREATE TABLE clientWorkout (
  clientId BINARY(16) NOT NULL,
  workoutId BINARY(16) NOT NULL,
  PRIMARY KEY (clientId, workoutId)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla workoutLevel
--

CREATE TABLE workoutLevel (
  id BINARY(16) NOT NULL PRIMARY KEY,
  name varchar(40) NOT NULL
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla workoutType
--

CREATE TABLE workoutType (
  id BINARY(16) NOT NULL PRIMARY KEY,
  name VARCHAR(40) NOT NULL
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla exercise
--

CREATE TABLE excercise (
  id BINARY(16) NOT NULL PRIMARY KEY,
  name VARCHAR(40) NOT NULL,
  description TEXT NOT NULL,
  imageId BINARY(16) NOT NULL
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla tag
--

CREATE TABLE tag (
  workoutId BINARY(16) NOT NULL,
  exerciseId BINARY(16) NOT NULL,
  PRIMARY KEY (workoutId, exerciseId)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla diet
--

CREATE TABLE diet (
  id BINARY(16) NOT NULL PRIMARY KEY,
  name VARCHAR(40) NOT NULL,
  calories INT NOT NULL,
  macros JSON NOT NULL,
  micros JSON NOT NULL
);

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla clientDiet
--

CREATE TABLE clientDiet (
  clientId BINARY(16) NOT NULL,
  dietId BINARY(16) NOT NULL,
  PRIMARY KEY (clientId, dietId)
);


-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla ingredient
--

CREATE TABLE ingredient (
  id BINARY(16) NOT NULL PRIMARY KEY,
  name VARCHAR(40) NOT NULL,
  quantity FLOAT NOT NULL,
  unit VARCHAR(10) NOT NULL
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