-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 02, 2023 at 08:30 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Onyx`
--

-- --------------------------------------------------------

--
-- Table structure for table `chest`
--

CREATE TABLE `chest` (
  `id` varchar(96) NOT NULL,
  `clientId` varchar(96) NOT NULL,
  `measurement` float NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `id` varchar(96) NOT NULL,
  `username` varchar(15) DEFAULT NULL,
  `firstName` varchar(40) NOT NULL,
  `lastName` varchar(40) NOT NULL,
  `authProvider` varchar(40) NOT NULL,
  `authProviderId` varchar(96) NOT NULL,
  `sex` char(1) DEFAULT NULL,
  `dateOfBirth` date DEFAULT NULL,
  `imageId` varchar(96) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`id`, `username`, `firstName`, `lastName`, `authProvider`, `authProviderId`, `sex`, `dateOfBirth`, `imageId`, `createdAt`) VALUES
('1dc61252-17c1-586d-8a1c-993acee898c2', 'sebas', 'Sebastián Armando', 'Flores Lemus', 'Google', '118292523864264837449', 'F', '2023-05-02', NULL, '2023-05-02 18:14:02');

--
-- Triggers `client`
--
DELIMITER $$
CREATE TRIGGER `userSex` AFTER INSERT ON `client` FOR EACH ROW BEGIN
  DECLARE newSexo varchar(10);
  SELECT c.sex into newSexo FROM client as c WHERE c.id = NEW.id;
  INSERT INTO usersex (sex, userId) VALUES (newSexo, NEW.id);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `clientDiet`
--

CREATE TABLE `clientDiet` (
  `clientId` varchar(96) NOT NULL,
  `dietId` varchar(96) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `clientGoal`
--

CREATE TABLE `clientGoal` (
  `clientId` varchar(96) NOT NULL,
  `goalId` varchar(96) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Triggers `clientGoal`
--
DELIMITER $$
CREATE TRIGGER `userGoalTrigger` AFTER INSERT ON `clientGoal` FOR EACH ROW BEGIN
  DECLARE newGoal VARCHAR(40);
  SELECT gl.nameGoal INTO newGoal FROM goal gl WHERE gl.id = NEW.goalId;
  INSERT INTO userGoal (id, _goal, clientId) VALUES (null, newGoal, NEW.clientId);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `clientLevel`
--

CREATE TABLE `clientLevel` (
  `clientId` varchar(96) NOT NULL,
  `physicLevelId` varchar(96) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Triggers `clientLevel`
--
DELIMITER $$
CREATE TRIGGER `userLevel` AFTER INSERT ON `clientLevel` FOR EACH ROW BEGIN
  DECLARE newLevel VARCHAR(40);
  SELECT pl.nameLevel INTO newLevel FROM physicLevel pl WHERE pl.id = NEW.physicLevelId;
  INSERT INTO userlevels (id, _level, clientId) VALUES (null, newLevel, NEW.clientId);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `clientRol`
--

CREATE TABLE `clientRol` (
  `clientId` varchar(96) NOT NULL,
  `rolId` varchar(96) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clientRol`
--

INSERT INTO `clientRol` (`clientId`, `rolId`, `createdAt`) VALUES
('1dc61252-17c1-586d-8a1c-993acee898c2', 'uuidR02', '2023-05-02 18:14:02');

-- --------------------------------------------------------

--
-- Table structure for table `clientWorkout`
--

CREATE TABLE `clientWorkout` (
  `clientId` varchar(96) NOT NULL,
  `workoutId` varchar(96) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `diet`
--

CREATE TABLE `diet` (
  `id` varchar(96) NOT NULL,
  `name` varchar(40) NOT NULL,
  `calories` float NOT NULL,
  `macros` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`macros`)),
  `micros` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`micros`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `excercise`
--

CREATE TABLE `excercise` (
  `id` varchar(96) NOT NULL,
  `name` varchar(40) NOT NULL,
  `description` text DEFAULT NULL,
  `imageId` varchar(96) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `goal`
--

CREATE TABLE `goal` (
  `id` varchar(96) NOT NULL,
  `nameGoal` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `goal`
--

INSERT INTO `goal` (`id`, `nameGoal`) VALUES
('uuidG001', 'Subir de peso'),
('uuidG002', 'Mantener peso'),
('uuidG003', 'Bajar de peso');

-- --------------------------------------------------------

--
-- Table structure for table `height`
--

CREATE TABLE `height` (
  `id` varchar(96) NOT NULL,
  `clientId` varchar(96) NOT NULL,
  `measurementHeight` float NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hip`
--

CREATE TABLE `hip` (
  `id` varchar(96) NOT NULL,
  `clientId` varchar(96) NOT NULL,
  `measurement` float NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE `image` (
  `id` varchar(96) NOT NULL,
  `src` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ingredient`
--

CREATE TABLE `ingredient` (
  `id` varchar(96) NOT NULL,
  `name` varchar(40) NOT NULL,
  `quantity` float NOT NULL,
  `unit` varchar(10) NOT NULL,
  `dietId` varchar(96) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `journalEntry`
--

CREATE TABLE `journalEntry` (
  `id` varchar(96) NOT NULL,
  `title` varchar(40) NOT NULL,
  `content` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `clientId` varchar(96) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Triggers `journalEntry`
--
DELIMITER $$
CREATE TRIGGER `newEntry` AFTER INSERT ON `journalEntry` FOR EACH ROW INSERT INTO userjournal (entryCount, userId, createdAt)
    VALUES (1, NEW.clientId, NOW())
    ON DUPLICATE KEY UPDATE entryCount = entryCount + 1
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `leftArm`
--

CREATE TABLE `leftArm` (
  `id` varchar(96) NOT NULL,
  `clientId` varchar(96) NOT NULL,
  `measurement` float NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `leftCalve`
--

CREATE TABLE `leftCalve` (
  `id` varchar(96) NOT NULL,
  `clientId` varchar(96) NOT NULL,
  `measurement` float NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `leftForearm`
--

CREATE TABLE `leftForearm` (
  `id` varchar(96) NOT NULL,
  `clientId` varchar(96) NOT NULL,
  `measurement` float NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `leftLeg`
--

CREATE TABLE `leftLeg` (
  `id` varchar(96) NOT NULL,
  `clientId` varchar(96) NOT NULL,
  `measurement` float NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `neck`
--

CREATE TABLE `neck` (
  `id` varchar(96) NOT NULL,
  `clientId` varchar(96) NOT NULL,
  `measurement` float NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `physicLevel`
--

CREATE TABLE `physicLevel` (
  `id` varchar(96) NOT NULL,
  `nameLevel` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `physicLevel`
--

INSERT INTO `physicLevel` (`id`, `nameLevel`) VALUES
('uuidPL001', 'Sedentario'),
('uuidPL002', 'Ejercicio 2 veces por semana'),
('uuidPL003', 'Caminata diaria'),
('uuidPL004', '4-5 días de gym'),
('uuidPL005', 'Alto rendimiento');

-- --------------------------------------------------------

--
-- Table structure for table `rightArm`
--

CREATE TABLE `rightArm` (
  `id` varchar(96) NOT NULL,
  `clientId` varchar(96) NOT NULL,
  `measurement` float NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rightCalve`
--

CREATE TABLE `rightCalve` (
  `id` varchar(96) NOT NULL,
  `clientId` varchar(96) NOT NULL,
  `measurement` float NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rightForearm`
--

CREATE TABLE `rightForearm` (
  `id` varchar(96) NOT NULL,
  `clientId` varchar(96) NOT NULL,
  `measurement` float NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rightLeg`
--

CREATE TABLE `rightLeg` (
  `id` varchar(96) NOT NULL,
  `clientId` varchar(96) NOT NULL,
  `measurement` float NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rol`
--

CREATE TABLE `rol` (
  `id` varchar(96) NOT NULL,
  `name` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rol`
--

INSERT INTO `rol` (`id`, `name`) VALUES
('uuidR01', 'Administrador'),
('uuidR02', 'Cliente');

-- --------------------------------------------------------

--
-- Table structure for table `rolService`
--

CREATE TABLE `rolService` (
  `rolId` varchar(96) NOT NULL,
  `serviceId` varchar(96) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rolService`
--

INSERT INTO `rolService` (`rolId`, `serviceId`) VALUES
('uuidR01', 'RF05'),
('uuidR01', 'RF06'),
('uuidR01', 'RF07'),
('uuidR01', 'RF08'),
('uuidR01', 'RF09'),
('uuidR01', 'RF10'),
('uuidR01', 'RF11'),
('uuidR01', 'RF12'),
('uuidR01', 'RF13'),
('uuidR01', 'RF14'),
('uuidR01', 'RF15'),
('uuidR01', 'RF16'),
('uuidR01', 'RF17'),
('uuidR01', 'RF18'),
('uuidR01', 'RF19'),
('uuidR01', 'RF20'),
('uuidR01', 'RF21'),
('uuidR01', 'RF22'),
('uuidR01', 'RF23'),
('uuidR01', 'RF24'),
('uuidR01', 'RF25'),
('uuidR01', 'RF26'),
('uuidR01', 'RF27'),
('uuidR01', 'RF28'),
('uuidR01', 'RF29'),
('uuidR01', 'RF30'),
('uuidR01', 'RF31'),
('uuidR01', 'RF32'),
('uuidR02', 'RF05'),
('uuidR02', 'RF06'),
('uuidR02', 'RF07'),
('uuidR02', 'RF08'),
('uuidR02', 'RF09'),
('uuidR02', 'RF10'),
('uuidR02', 'RF11'),
('uuidR02', 'RF12'),
('uuidR02', 'RF13'),
('uuidR02', 'RF14'),
('uuidR02', 'RF15'),
('uuidR02', 'RF16'),
('uuidR02', 'RF17'),
('uuidR02', 'RF18'),
('uuidR02', 'RF19'),
('uuidR02', 'RF20'),
('uuidR02', 'RF21');

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `id` varchar(96) NOT NULL,
  `name` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`id`, `name`) VALUES
('RF05', 'Eliminar cuenta'),
('RF06', 'Editar información personal del perfil'),
('RF07', 'Añadir medidas corporales'),
('RF08', 'Consultar medidas corporales'),
('RF09', 'Editar medidas corporales'),
('RF10', 'Eliminar medidas corporales'),
('RF11', 'Consultar información de progreso'),
('RF12', 'Consultar dietas'),
('RF13', 'Añadir/eliminar dieta a favoritos'),
('RF14', 'Consultar ejercicios'),
('RF15', 'Consultar rutinas'),
('RF16', 'Añadir/eliminar rutina a favoritos'),
('RF17', 'Consultar entradas bitácora'),
('RF18', 'Añadir entrada a bitácora'),
('RF19', 'Editar entrada de bitácora'),
('RF20', 'Eliminar entrada de bitácora'),
('RF21', 'Descargar entradas de bitácora'),
('RF22', 'Añadir dieta'),
('RF23', 'Editar dieta'),
('RF24', 'Eliminar dieta'),
('RF25', 'Añadir ejercicio'),
('RF26', 'Editar ejercicio'),
('RF27', 'Eliminar ejercicio'),
('RF28', 'Añadir rutina'),
('RF29', 'Editar rutina'),
('RF30', 'Eliminar rutina'),
('RF31', 'Consultar usuarios'),
('RF32', 'Editar rol de un usuario');

-- --------------------------------------------------------

--
-- Table structure for table `tag`
--

CREATE TABLE `tag` (
  `workoutId` varchar(96) NOT NULL,
  `exerciseId` varchar(96) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `userGoal`
--

CREATE TABLE `userGoal` (
  `id` int(11) NOT NULL,
  `_goal` varchar(100) NOT NULL,
  `clientId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userGoal`
--

INSERT INTO `userGoal` (`id`, `_goal`, `clientId`, `createdAt`) VALUES
(1, 'Mantener peso', 1, '2023-04-27 07:45:42');

-- --------------------------------------------------------

--
-- Table structure for table `userjournal`
--

CREATE TABLE `userjournal` (
  `id` int(11) NOT NULL,
  `entryCount` int(11) NOT NULL,
  `userId` varchar(100) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `userjournal`
--

INSERT INTO `userjournal` (`id`, `entryCount`, `userId`, `createdAt`) VALUES
(1, 3, '563efea7-a141-55a8-9dac-43392b2f942c', '2023-04-27 06:15:57'),
(4, 1, 'uuidU001', '2023-04-27 06:18:48');

-- --------------------------------------------------------

--
-- Table structure for table `userlevels`
--

CREATE TABLE `userlevels` (
  `id` int(11) NOT NULL,
  `_level` varchar(100) NOT NULL,
  `clientId` varchar(100) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userlevels`
--

INSERT INTO `userlevels` (`id`, `_level`, `clientId`, `createdAt`) VALUES
(1, 'Ejercicio 2 veces por semana', 'test', '2023-04-27 07:18:04');

-- --------------------------------------------------------

--
-- Table structure for table `usersex`
--

CREATE TABLE `usersex` (
  `id` int(11) NOT NULL,
  `sex` char(1) NOT NULL,
  `userId` varchar(100) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `usersex`
--

INSERT INTO `usersex` (`id`, `sex`, `userId`, `createdAt`) VALUES
(1, 'F', 'A2', '2023-04-27 06:00:05'),
(2, 'U', '1dc61252-17c1-586d-8a1c-993acee898c2', '2023-05-02 18:14:02');

-- --------------------------------------------------------

--
-- Table structure for table `waist`
--

CREATE TABLE `waist` (
  `id` varchar(96) NOT NULL,
  `clientId` varchar(96) NOT NULL,
  `measurement` float NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `weight`
--

CREATE TABLE `weight` (
  `id` varchar(96) NOT NULL,
  `clientId` varchar(96) NOT NULL,
  `measurementWeight` float NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `workout`
--

CREATE TABLE `workout` (
  `id` varchar(96) NOT NULL,
  `name` varchar(40) NOT NULL,
  `description` text DEFAULT NULL,
  `frequency` int(11) NOT NULL,
  `workoutLevelId` varchar(96) DEFAULT NULL,
  `typeId` varchar(96) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `workoutImage`
--

CREATE TABLE `workoutImage` (
  `id` varchar(96) NOT NULL,
  `idWorkout` varchar(96) NOT NULL,
  `imageId` varchar(96) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `workoutLevel`
--

CREATE TABLE `workoutLevel` (
  `id` varchar(96) NOT NULL,
  `name` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `workoutLevel`
--

INSERT INTO `workoutLevel` (`id`, `name`) VALUES
('uuidWL01', 'Principiante'),
('uuidWL02', 'Intermedio'),
('uuidWL03', 'Avanzado');

-- --------------------------------------------------------

--
-- Table structure for table `workoutType`
--

CREATE TABLE `workoutType` (
  `id` varchar(96) NOT NULL,
  `name` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `workoutType`
--

INSERT INTO `workoutType` (`id`, `name`) VALUES
('uuidWT001', 'Fuerza'),
('uuidWT002', 'Hipertrofia'),
('uuidWT003', 'Híbrido');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chest`
--
ALTER TABLE `chest`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clientId` (`clientId`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`),
  ADD KEY `imageId` (`imageId`);

--
-- Indexes for table `clientDiet`
--
ALTER TABLE `clientDiet`
  ADD PRIMARY KEY (`clientId`,`dietId`),
  ADD KEY `dietId` (`dietId`);

--
-- Indexes for table `clientGoal`
--
ALTER TABLE `clientGoal`
  ADD PRIMARY KEY (`clientId`,`goalId`),
  ADD KEY `goalId` (`goalId`);

--
-- Indexes for table `clientLevel`
--
ALTER TABLE `clientLevel`
  ADD PRIMARY KEY (`clientId`,`physicLevelId`),
  ADD KEY `physicLevelId` (`physicLevelId`);

--
-- Indexes for table `clientRol`
--
ALTER TABLE `clientRol`
  ADD PRIMARY KEY (`clientId`,`rolId`),
  ADD KEY `rolId` (`rolId`);

--
-- Indexes for table `clientWorkout`
--
ALTER TABLE `clientWorkout`
  ADD PRIMARY KEY (`clientId`,`workoutId`),
  ADD KEY `workoutId` (`workoutId`);

--
-- Indexes for table `diet`
--
ALTER TABLE `diet`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `excercise`
--
ALTER TABLE `excercise`
  ADD PRIMARY KEY (`id`),
  ADD KEY `imageId` (`imageId`);

--
-- Indexes for table `goal`
--
ALTER TABLE `goal`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `height`
--
ALTER TABLE `height`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clientId` (`clientId`);

--
-- Indexes for table `hip`
--
ALTER TABLE `hip`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clientId` (`clientId`);

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ingredient`
--
ALTER TABLE `ingredient`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dietId` (`dietId`);

--
-- Indexes for table `journalEntry`
--
ALTER TABLE `journalEntry`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clientId` (`clientId`);

--
-- Indexes for table `leftArm`
--
ALTER TABLE `leftArm`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clientId` (`clientId`);

--
-- Indexes for table `leftCalve`
--
ALTER TABLE `leftCalve`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clientId` (`clientId`);

--
-- Indexes for table `leftForearm`
--
ALTER TABLE `leftForearm`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clientId` (`clientId`);

--
-- Indexes for table `leftLeg`
--
ALTER TABLE `leftLeg`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clientId` (`clientId`);

--
-- Indexes for table `neck`
--
ALTER TABLE `neck`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clientId` (`clientId`);

--
-- Indexes for table `physicLevel`
--
ALTER TABLE `physicLevel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rightArm`
--
ALTER TABLE `rightArm`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clientId` (`clientId`);

--
-- Indexes for table `rightCalve`
--
ALTER TABLE `rightCalve`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clientId` (`clientId`);

--
-- Indexes for table `rightForearm`
--
ALTER TABLE `rightForearm`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clientId` (`clientId`);

--
-- Indexes for table `rightLeg`
--
ALTER TABLE `rightLeg`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clientId` (`clientId`);

--
-- Indexes for table `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rolService`
--
ALTER TABLE `rolService`
  ADD PRIMARY KEY (`rolId`,`serviceId`),
  ADD KEY `serviceId` (`serviceId`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`workoutId`,`exerciseId`),
  ADD KEY `exerciseId` (`exerciseId`);

--
-- Indexes for table `userGoal`
--
ALTER TABLE `userGoal`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `clientId` (`clientId`);

--
-- Indexes for table `userjournal`
--
ALTER TABLE `userjournal`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userId` (`userId`);

--
-- Indexes for table `userlevels`
--
ALTER TABLE `userlevels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usersex`
--
ALTER TABLE `usersex`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userId` (`userId`);

--
-- Indexes for table `waist`
--
ALTER TABLE `waist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clientId` (`clientId`);

--
-- Indexes for table `weight`
--
ALTER TABLE `weight`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clientId` (`clientId`);

--
-- Indexes for table `workout`
--
ALTER TABLE `workout`
  ADD PRIMARY KEY (`id`),
  ADD KEY `workoutLevelId` (`workoutLevelId`),
  ADD KEY `typeId` (`typeId`);

--
-- Indexes for table `workoutImage`
--
ALTER TABLE `workoutImage`
  ADD PRIMARY KEY (`id`,`idWorkout`),
  ADD KEY `idWorkout` (`idWorkout`),
  ADD KEY `imageId` (`imageId`);

--
-- Indexes for table `workoutLevel`
--
ALTER TABLE `workoutLevel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `workoutType`
--
ALTER TABLE `workoutType`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `userGoal`
--
ALTER TABLE `userGoal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `userjournal`
--
ALTER TABLE `userjournal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `userlevels`
--
ALTER TABLE `userlevels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `usersex`
--
ALTER TABLE `usersex`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chest`
--
ALTER TABLE `chest`
  ADD CONSTRAINT `chest_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`);

--
-- Constraints for table `client`
--
ALTER TABLE `client`
  ADD CONSTRAINT `client_ibfk_1` FOREIGN KEY (`imageId`) REFERENCES `image` (`id`);

--
-- Constraints for table `clientDiet`
--
ALTER TABLE `clientDiet`
  ADD CONSTRAINT `clientdiet_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`),
  ADD CONSTRAINT `clientdiet_ibfk_2` FOREIGN KEY (`dietId`) REFERENCES `diet` (`id`);

--
-- Constraints for table `clientGoal`
--
ALTER TABLE `clientGoal`
  ADD CONSTRAINT `clientgoal_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`),
  ADD CONSTRAINT `clientgoal_ibfk_2` FOREIGN KEY (`goalId`) REFERENCES `goal` (`id`);

--
-- Constraints for table `clientLevel`
--
ALTER TABLE `clientLevel`
  ADD CONSTRAINT `clientlevel_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`),
  ADD CONSTRAINT `clientlevel_ibfk_2` FOREIGN KEY (`physicLevelId`) REFERENCES `physicLevel` (`id`);

--
-- Constraints for table `clientRol`
--
ALTER TABLE `clientRol`
  ADD CONSTRAINT `clientrol_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`),
  ADD CONSTRAINT `clientrol_ibfk_2` FOREIGN KEY (`rolId`) REFERENCES `rol` (`id`);

--
-- Constraints for table `clientWorkout`
--
ALTER TABLE `clientWorkout`
  ADD CONSTRAINT `clientworkout_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`),
  ADD CONSTRAINT `clientworkout_ibfk_2` FOREIGN KEY (`workoutId`) REFERENCES `workout` (`id`);

--
-- Constraints for table `excercise`
--
ALTER TABLE `excercise`
  ADD CONSTRAINT `excercise_ibfk_1` FOREIGN KEY (`imageId`) REFERENCES `image` (`id`);

--
-- Constraints for table `height`
--
ALTER TABLE `height`
  ADD CONSTRAINT `height_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`);

--
-- Constraints for table `hip`
--
ALTER TABLE `hip`
  ADD CONSTRAINT `hip_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`);

--
-- Constraints for table `ingredient`
--
ALTER TABLE `ingredient`
  ADD CONSTRAINT `ingredient_ibfk_1` FOREIGN KEY (`dietId`) REFERENCES `diet` (`id`);

--
-- Constraints for table `journalEntry`
--
ALTER TABLE `journalEntry`
  ADD CONSTRAINT `journalentry_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`);

--
-- Constraints for table `leftArm`
--
ALTER TABLE `leftArm`
  ADD CONSTRAINT `leftarm_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`);

--
-- Constraints for table `leftCalve`
--
ALTER TABLE `leftCalve`
  ADD CONSTRAINT `leftcalve_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`);

--
-- Constraints for table `leftForearm`
--
ALTER TABLE `leftForearm`
  ADD CONSTRAINT `leftforearm_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`);

--
-- Constraints for table `leftLeg`
--
ALTER TABLE `leftLeg`
  ADD CONSTRAINT `leftleg_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`);

--
-- Constraints for table `neck`
--
ALTER TABLE `neck`
  ADD CONSTRAINT `neck_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`);

--
-- Constraints for table `rightArm`
--
ALTER TABLE `rightArm`
  ADD CONSTRAINT `rightarm_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`);

--
-- Constraints for table `rightCalve`
--
ALTER TABLE `rightCalve`
  ADD CONSTRAINT `rightcalve_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`);

--
-- Constraints for table `rightForearm`
--
ALTER TABLE `rightForearm`
  ADD CONSTRAINT `rightforearm_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`);

--
-- Constraints for table `rightLeg`
--
ALTER TABLE `rightLeg`
  ADD CONSTRAINT `rightleg_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`);

--
-- Constraints for table `rolService`
--
ALTER TABLE `rolService`
  ADD CONSTRAINT `rolservice_ibfk_1` FOREIGN KEY (`rolId`) REFERENCES `rol` (`id`),
  ADD CONSTRAINT `rolservice_ibfk_2` FOREIGN KEY (`serviceId`) REFERENCES `service` (`id`);

--
-- Constraints for table `tag`
--
ALTER TABLE `tag`
  ADD CONSTRAINT `tag_ibfk_1` FOREIGN KEY (`workoutId`) REFERENCES `workout` (`id`),
  ADD CONSTRAINT `tag_ibfk_2` FOREIGN KEY (`exerciseId`) REFERENCES `excercise` (`id`);

--
-- Constraints for table `waist`
--
ALTER TABLE `waist`
  ADD CONSTRAINT `waist_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`);

--
-- Constraints for table `weight`
--
ALTER TABLE `weight`
  ADD CONSTRAINT `weight_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`);

--
-- Constraints for table `workout`
--
ALTER TABLE `workout`
  ADD CONSTRAINT `workout_ibfk_1` FOREIGN KEY (`workoutLevelId`) REFERENCES `workoutLevel` (`id`),
  ADD CONSTRAINT `workout_ibfk_2` FOREIGN KEY (`typeId`) REFERENCES `workoutType` (`id`);

--
-- Constraints for table `workoutImage`
--
ALTER TABLE `workoutImage`
  ADD CONSTRAINT `workoutimage_ibfk_1` FOREIGN KEY (`idWorkout`) REFERENCES `workout` (`id`),
  ADD CONSTRAINT `workoutimage_ibfk_2` FOREIGN KEY (`imageId`) REFERENCES `image` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
