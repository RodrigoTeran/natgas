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

-- userLevels