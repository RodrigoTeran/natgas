------------------------ User Sex --------------------------

-- Table structure for table `usersex`
--

CREATE TABLE `usersex` (
  `id` int(11) NOT NULL,
  `sex` char(1) NOT NULL,
  `userId` varchar(100) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usersex`
--

INSERT INTO `usersex` (`id`, `sex`, `userId`, `createdAt`) VALUES
(1, 'F', 'A2', '2023-04-27 00:00:05');

--
-- Indexes for table `usersex`
--
ALTER TABLE `usersex`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userId` (`userId`);

--
-- AUTO_INCREMENT for table `usersex`
--
ALTER TABLE `usersex`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

-- Trigger

CREATE TRIGGER `userSex` AFTER INSERT ON `client`
 FOR EACH ROW BEGIN
    DECLARE newSexo VARCHAR(10);
    SELECT c.sex INTO newSexo FROM client as c WHERE c.id = NEW.id;
    INSERT INTO usersex (id, sex, userId) VALUES (NULL, newSexo, NEW.id);
END

-- Test data

INSERT INTO `client` (`id`, `username`, `firstName`, `lastName`, `authProvider`, `authProviderId`, `sex`, `dateOfBirth`, `imageId`, `createdAt`) VALUES ('A1', 'Test', 'TestFirst', 'TestLast', 'Google', '', 'M', NULL, NULL, CURRENT_TIMESTAMP);

-- Query

SELECT SUM(CASE WHEN sex = 'M' THEN 1 ELSE 0 END) AS totalMasculinos,
       SUM(CASE WHEN sex = 'F' THEN 1 ELSE 0 END) AS totalFemeninos
FROM userSex;


------------------------------- userJournal -----------------------------

-- Tabla

-- Table structure for table `userjournal`
--

CREATE TABLE `userjournal` (
  `id` int(11) NOT NULL,
  `entryCount` int(11) NOT NULL,
  `userId` varchar(100) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `userjournal`
--

INSERT INTO `userjournal` (`id`, `entryCount`, `userId`, `createdAt`) VALUES
(1, 3, '563efea7-a141-55a8-9dac-43392b2f942c', '2023-04-27 00:15:57'),
(4, 1, 'uuidU001', '2023-04-27 00:18:48');

--
-- Indexes for table `userjournal`
--
ALTER TABLE `userjournal`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userId` (`userId`);

--
-- AUTO_INCREMENT for table `userjournal`
--
ALTER TABLE `userjournal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

-- Trigger

CREATE TRIGGER `newEntry` AFTER INSERT ON `journalentry`
 FOR EACH ROW INSERT INTO userjournal (entryCount, userId, createdAt)
    VALUES (1, NEW.clientId, NOW())
    ON DUPLICATE KEY UPDATE entryCount = entryCount + 1;

-- Test data

INSERT INTO `journalentry` (`id`, `aDate`, `title`, `content`, `createdAt`, `clientId`) VALUES ('1', '2023-04-27', 'hh', 'hh', CURRENT_TIMESTAMP, '563efea7-a141-55a8-9dac-43392b2f942c');

-- Query

SELECT SUM(entryCount) AS totalEntries
FROM userjournal
GROUP BY userId;

-- userGoals

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
(1, 'Mantener peso', 1, '2023-04-27 01:45:42');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `userGoal`
--
ALTER TABLE `userGoal`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `clientId` (`clientId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `userGoal`
--
ALTER TABLE `userGoal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

-- trigger
--
CREATE TRIGGER `userGoalTrigger` AFTER INSERT ON `clientGoal`
 FOR EACH ROW BEGIN
    DECLARE newGoal VARCHAR(40);
  SELECT gl.name INTO newGoal FROM goal gl WHERE gl.id = NEW.goalId;
  INSERT INTO userGoal (id, _goal, clientId) VALUES (null, newGoal, NEW.clientId);
END

-- DUMP DATA INTO client goal to test
INSERT INTO `clientGoal` (`clientId`, `goalId`, `createdAt`) VALUES ('1', 'uuidG002', current_timestamp());

-- Query

SELECT SUM(CASE WHEN _goal = 'Subir de peso' THEN 1 ELSE 0 END) AS "Subir de peso",
       SUM(CASE WHEN _goal = 'Mantener peso' THEN 1 ELSE 0 END) AS "Mantener peso",
       SUM(CASE WHEN _goal = 'Bajar de peso' THEN 1 ELSE 0 END) AS "Bajar de peso"
FROM userGoal;


-- userLevels

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
(1, 'Ejercicio 2 veces por semana', 'test', '2023-04-27 01:18:04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `userlevels`
--
ALTER TABLE `userlevels`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `userlevels`
--
ALTER TABLE `userlevels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

-- trigger

CREATE TRIGGER `userLevel` AFTER INSERT ON `clientLevel`
 FOR EACH ROW BEGIN
 DECLARE newLevel VARCHAR(40);
  SELECT pl.name INTO newLevel FROM physicLevel pl WHERE pl.id = NEW.physicLevelId;
  INSERT INTO userlevels (id, _level, clientId) VALUES (null, newLevel, NEW.clientId);
END

-- Query

SELECT SUM(CASE WHEN _level = 'Sedentario' THEN 1 ELSE 0 END) AS "Total Sedentarios",
       SUM(CASE WHEN _level = 'Ejercicio 2 veces por semana' THEN 1 ELSE 0 END) AS "Total 2 veces por semana",
       SUM(CASE WHEN _level = 'Caminata diaria' THEN 1 ELSE 0 END) AS "Caminata diaria",
       SUM(CASE WHEN _level = '4-5 días de gym' THEN 1 ELSE 0 END) AS "4-5 días de gym",
       SUM(CASE WHEN _level = 'Alto rendimiento' THEN 1 ELSE 0 END) AS "Alto rendimiento"
FROM userlevels;