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
  username VARCHAR(15) NOT NULL,
  authProvider VARCHAR(20) NOT NULL,
  authProviderId VARCHAR(96) NOT NULL,
  sex CHAR(1) NOT NULL,
  dateOfBirth DATE NOT NULL,
  imageId VARCHAR(96) NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla physicLevel
--

CREATE TABLE physicLevel (
  id VARCHAR(96) NOT NULL PRIMARY KEY,
  name varchar(20) NOT NULL
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
  name VARCHAR(20) NOT NULL
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
  title VARCHAR(20) NOT NULL,
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
  name VARCHAR(20) NOT NULL
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
  name VARCHAR(20) NOT NULL
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
  name VARCHAR(20) NOT NULL,
  description TEXT NOT NULL,
  frequency INT NOT NULL,
  workoutLevelId VARCHAR(96) NOT NULL,
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
  name varchar(20) NOT NULL
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla workoutType
--

CREATE TABLE workoutType (
  id VARCHAR(96) NOT NULL PRIMARY KEY,
  name VARCHAR(20) NOT NULL
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla exercise
--

CREATE TABLE excercise (
  id VARCHAR(96) NOT NULL PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
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
  name VARCHAR(20) NOT NULL,
  calories INT NOT NULL
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
  carbs FLOAT NOT NULL,
  fat FLOAT NOT NULL,
  protein FLOAT NOT NULL
);

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla dietIngredient
--

CREATE TABLE dietIngredient (
  dietId VARCHAR(96) NOT NULL,
  ingredientId VARCHAR(96) NOT NULL,
  quantity INT NOT NULL,
  unit VARCHAR(4) NOT NULL,
  PRIMARY KEY(dietId, ingredientId)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla micros
--

CREATE TABLE micros (
  id VARCHAR(96) NOT NULL PRIMARY KEY,
  name VARCHAR(20) NOT NULL
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla microsIngredient
--

CREATE TABLE microsIngredient (
  microsId VARCHAR(96) NOT NULL,
  ingredientId VARCHAR(96) NOT NULL,
  microsPerGram FLOAT NOT NULL,
  PRIMARY KEY (microsId, ingredientId)
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
-- Llaves foráneas para la tabla dietIngredient
--

ALTER TABLE dietIngredient
ADD FOREIGN KEY (dietId) REFERENCES diet(id),
ADD FOREIGN KEY (ingredientId) REFERENCES ingredient(id);

-- --------------------------------------------------------

--
-- Llaves foráneas para la tabla microsIngredient
--

ALTER TABLE microsIngredient
ADD FOREIGN KEY (microsId) REFERENCES micros(id),
ADD FOREIGN KEY (ingredientId) REFERENCES ingredient(id);
