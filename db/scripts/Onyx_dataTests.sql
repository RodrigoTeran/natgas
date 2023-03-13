USE Onyx;

INSERT INTO image(id, src) VALUES
('uuidI001', 'https://static.vecteezy.com/system/resources/previews/011/336/914/original/gym-and-fitness-logo-png.png'),
('uuidI002', 'https://static.vecteezy.com/system/resources/previews/011/319/007/original/gym-and-fitness-logo-png.png'),
('uuidI003', 'https://e7.pngegg.com/pngimages/447/997/png-clipart-physical-fitness-logo-fitness-centre-woman-dumbbell-fitness-woman-business-woman-fitness.png'),
('uuidI004', 'https://i.blogs.es/1fd119/sentadilla/1366_2000.jpg'),
('uuidI005', 'https://i.blogs.es/85d668/bench-press-1/450_1000.webp'),
('uuidI006', 'https://www.entrenamientos.com/media/cache/exercise_375/uploads/exercise/peso-muerto-con-barra-tradicional-init-pos-4394.png'),
('uuidI007', 'https://cdn.shopify.com/s/files/1/0269/5551/3900/files/Seated-Barbell-Shoulder-Press_600x600.png?v=1619977796'),
('uuidI008', 'https://i.ytimg.com/vi/R38OvrWZLSw/hqdefault.jpg'),
('uuidI009', 'https://i.pinimg.com/originals/dc/24/e3/dc24e350d5c4f859e5552d283fad3702.jpg'),
('uuidI010', 'https://qph.cf2.quoracdn.net/main-qimg-cb3141eff73eab0ef961e1874fa0be2b-lq'),
('uuidI011', 'https://avatars.githubusercontent.com/u/113733780?s=400&u=ac948d8d2c50dc6c781f4bd828e9ef5b7349320c&v=4'),
('uuidI012', 'https://eresfitness.com/wp-content/uploads/2019/05/Press-franc%C3%A9s.jpg'),
('uuidI013', 'https://www.onlinepersonaltrainer.es/wp-content/uploads/2015/12/C%C3%B3mo-hacer-dominadas.jpg'),
('uuidI014', 'https://i.blogs.es/209555/remo1/450_1000.webp'),
('uuidI015', 'https://i.blogs.es/b7fb2b/prensa/450_1000.webp'),
('uuidI016', 'https://www.musculaciontotal.com/wp-content/uploads/2015/05/elevacion-de-piernas-en-barra.jpg'),
('uuidI017', 'https://i.blogs.es/6a82d6/1024_682-4-/1366_2000.jpeg'),
('uuidI018', 'https://i0.wp.com/gimnasiogym.net/wp-content/uploads/2021/03/push-ups-2.jpg?resize=1022%2C1024');

INSERT INTO client(id, username, authProvider, authProviderId, sex, dateOfBirth, imageId) VALUES
('uuidU001', 'raulFlores', 'facebook', 'FUIDC001', 'M', '1990-01-01', 'uuidI001'),
('uuidU002', 'manuelFlores', 'google', 'GUIDC001', 'M', '1990-01-01', 'uuidI002'),
('uuidU003', 'domi', 'google', 'GUIDC002', 'F', '2000-12-20', 'uuidI003'),
('uuidU004', 'Armando', 'google', 'GUIDC003', 'M', '2003-03-01', 'uuidI011'),
('uuidU005', 'dani', 'google', 'GUIDC004', 'M', '2003-01-01', NULL),
('uuidU006', 'sebas', 'google', 'GUIDC005', 'M', '2003-01-01', NULL),
('uuidU007', 'teran', 'google', 'GUIDC006', 'M', '2003-01-01', NULL),
('uuidU008', 'ramona', 'google', 'GUIDC007', 'F', '2003-10-11', NULL),
('uuidU009', 'emma', 'facebook', 'FUIDC002', 'F', '1997-08-27', NULL),
('uuidU010', 'ivan', 'google', 'GUIDC008', 'M', '2005-02-14', NULL),
('uuidU011', 'dante', 'facebook', 'FUIDC003', 'M', '1995-05-30', NULL),
('uuidU012', 'olivia', 'facebook', 'FUIDC004', 'F', '2001-07-22', NULL),
('uuidU013', 'sara', 'google', 'GUIDC009', 'F', '2002-11-11', NULL),
('uuidU014', 'fati', 'facebook', 'FUIDC005', 'F', '1999-06-04', NULL),
('uuidU015', 'gaby', 'facebook', 'FUIDC006', 'F', '1993-09-02', NULL),
('uuidU016', 'victor', 'facebook', 'FUIDC007', 'M', '2004-11-12', NULL),
('uuidU017', 'arianna', 'google', 'GUIDC010', 'F', '1998-04-17', NULL),
('uuidU018', 'hugo', 'facebook', 'FUIDC008', 'M', '1992-08-21', NULL),
('uuidU019', 'amelia', 'facebook', 'FUIDC009', 'F', '1991-03-07', NULL),
('uuidU020', 'lili', 'facebook', 'FUIDC010', 'F', '1996-05-28', NULL);

-- Estático
INSERT INTO physicLevel(id, name) VALUES
('uuidPL001', 'Sedentario'),
('uuidPL002', 'Ejercicio 2 veces por semana'),
('uuidPL003', 'Caminata diaria'),
('uuidPL004', '4-5 días de gym'),
('uuidPL005', 'Alto rendimiento');

INSERT INTO clientLevel(clientId, physicLevelId) VALUES
('uuidU001', 'uuidPL005'),
('uuidU002', 'uuidPL004'),
('uuidU003', 'uuidPL004'),
('uuidU004', 'uuidPL004'),
('uuidU005', 'uuidPL004'),
('uuidU006', 'uuidPL004'),
('uuidU007', 'uuidPL004'),
('uuidU008', 'uuidPL004'),
('uuidU009', 'uuidPL001'),
('uuidU010', 'uuidPL003'),
('uuidU011', 'uuidPL003'),
('uuidU012', 'uuidPL005'),
('uuidU013', 'uuidPL002'),
('uuidU014', 'uuidPL002'),
('uuidU015', 'uuidPL005'),
('uuidU016', 'uuidPL001'),
('uuidU017', 'uuidPL003'),
('uuidU018', 'uuidPL005'),
('uuidU019', 'uuidPL001'),
('uuidU020', 'uuidPL002');

-- Estático
INSERT INTO goal(id, name) VALUES
('uuidG001', 'Subir de peso'),
('uuidG002', 'Mantener peso'),
('uuidG003', 'Bajar de peso');

INSERT INTO clientGoal(clientId, goalId) VALUES
('uuidU001', 'uuidG002'),
('uuidU002', 'uuidG001'),
('uuidU003', 'uuidG001'),
('uuidU004', 'uuidG001'),
('uuidU005', 'uuidG002'),
('uuidU006', 'uuidG002'),
('uuidU007', 'uuidG002'),
('uuidU008', 'uuidG002'),
('uuidU009', 'uuidG001'),
('uuidU010', 'uuidG003'),
('uuidU011', 'uuidG002'),
('uuidU012', 'uuidG003'),
('uuidU013', 'uuidG002'),
('uuidU014', 'uuidG001'),
('uuidU015', 'uuidG002'),
('uuidU016', 'uuidG003'),
('uuidU017', 'uuidG003'),
('uuidU018', 'uuidG001'),
('uuidU019', 'uuidG002'),
('uuidU020', 'uuidG001');

INSERT INTO weight(id, clientId, measurement) VALUES
('uuidW001', 'uuidU001', 63.7),
('uuidW002', 'uuidU002', 63.7),
('uuidW003', 'uuidU003', 63.7),
('uuidW004', 'uuidU004', 65),
('uuidW005', 'uuidU005', 63.7),
('uuidW006', 'uuidU006', 63.7),
('uuidW007', 'uuidU007', 63.7),
('uuidW008', 'uuidU008', 63.7),
('uuidW009', 'uuidU009', 63.7),
('uuidW010', 'uuidU010', 63.7),
('uuidW011', 'uuidU011', 63.7),
('uuidW012', 'uuidU012', 63.7),
('uuidW013', 'uuidU013', 63.7),
('uuidW014', 'uuidU014', 63.7),
('uuidW015', 'uuidU015', 63.7),
('uuidW016', 'uuidU016', 63.7),
('uuidW017', 'uuidU017', 63.7),
('uuidW018', 'uuidU018', 63.7),
('uuidW019', 'uuidU019', 63.7),
('uuidW020', 'uuidU020', 63.7);

INSERT INTO height(id, clientId, measurement) VALUES
('uuidH001', 'uuidU001', 1.65),
('uuidH002', 'uuidU002', 1.74),
('uuidH003', 'uuidU003', 1.72),
('uuidH004', 'uuidU004', 1.60),
('uuidH005', 'uuidU005', 1.47),
('uuidH006', 'uuidU006', 1.78),
('uuidH007', 'uuidU007', 1.75),
('uuidH008', 'uuidU008', 1.72),
('uuidH009', 'uuidU009', 1.87),
('uuidH010', 'uuidU010', 1.82),
('uuidH011', 'uuidU011', 1.69),
('uuidH012', 'uuidU012', 1.71),
('uuidH013', 'uuidU013', 1.47),
('uuidH014', 'uuidU014', 2.0),
('uuidH015', 'uuidU015', 1.91),
('uuidH016', 'uuidU016', 1.74),
('uuidH017', 'uuidU017', 1.63),
('uuidH018', 'uuidU018', 1.57),
('uuidH019', 'uuidU019', 1.67),
('uuidH020', 'uuidU020', 1.71);

INSERT INTO neck(id, clientId, measurement) VALUES
('uuidN001', 'uuidU003', 41.3),
('uuidN002', 'uuidU004', 37),
('uuidN003', 'uuidU003', 35),
('uuidN004', 'uuidU004', 41),
('uuidN005', 'uuidU005', 35),
('uuidN006', 'uuidU006', 35),
('uuidN007', 'uuidU007', 33),
('uuidN008', 'uuidU008', 35),
('uuidN009', 'uuidU009', 30),
('uuidN010', 'uuidU010', 35),
('uuidN011', 'uuidU011', 35),
('uuidN012', 'uuidU012', 35),
('uuidN013', 'uuidU013', 32),
('uuidN014', 'uuidU014', 35),
('uuidN015', 'uuidU015', 33.1),
('uuidN016', 'uuidU016', 30),
('uuidN017', 'uuidU017', 30),
('uuidN018', 'uuidU018', 32),
('uuidN019', 'uuidU019', 31),
('uuidN020', 'uuidU020', 30);

INSERT INTO chest(id, clientId, measurement) VALUES
('uuidC001', 'uuidU001', 84.7),
('uuidC002', 'uuidU002', 94),
('uuidC003', 'uuidU003', 70),
('uuidC004', 'uuidU004', 60),
('uuidC005', 'uuidU005', 70),
('uuidC006', 'uuidU006', 70),
('uuidC007', 'uuidU007', 72),
('uuidC008', 'uuidU008', 70),
('uuidC009', 'uuidU009', 79),
('uuidC010', 'uuidU010', 70),
('uuidC011', 'uuidU011', 70),
('uuidC012', 'uuidU012', 70),
('uuidC013', 'uuidU013', 66),
('uuidC014', 'uuidU014', 70),
('uuidC015', 'uuidU015', 69),
('uuidC016', 'uuidU016', 79),
('uuidC017', 'uuidU017', 79),
('uuidC018', 'uuidU018', 66),
('uuidC019', 'uuidU019', 59),
('uuidC020', 'uuidU020', 80);


INSERT INTO leftArm(id, clientId, measurement) VALUES
('uuidLA001', 'uuidU001', 27.1),
('uuidLA002', 'uuidU002', 33.5),
('uuidLA003', 'uuidU003', 35),
('uuidLA004', 'uuidU004', 41),
('uuidLA005', 'uuidU005', 35),
('uuidLA006', 'uuidU006', 35),
('uuidLA007', 'uuidU007', 33),
('uuidLA008', 'uuidU008', 35),
('uuidLA009', 'uuidU009', 30),
('uuidLA010', 'uuidU010', 35),
('uuidLA011', 'uuidU011', 35),
('uuidLA012', 'uuidU012', 35),
('uuidLA013', 'uuidU013', 32),
('uuidLA014', 'uuidU014', 35),
('uuidLA015', 'uuidU015', 33.1),
('uuidLA016', 'uuidU016', 30),
('uuidLA017', 'uuidU017', 30),
('uuidLA018', 'uuidU018', 32),
('uuidLA019', 'uuidU019', 31),
('uuidLA020', 'uuidU020', 30);


INSERT INTO rightArm(id, clientId, measurement) VALUES
('uuidRA001', 'uuidU001', 27.5),
('uuidRA002', 'uuidU002', 33),
('uuidRA003', 'uuidU003', 35),
('uuidRA004', 'uuidU004', 41),
('uuidRA005', 'uuidU005', 35),
('uuidRA006', 'uuidU006', 35),
('uuidRA007', 'uuidU007', 33),
('uuidRA008', 'uuidU008', 35),
('uuidRA009', 'uuidU009', 30),
('uuidRA010', 'uuidU010', 35),
('uuidRA011', 'uuidU011', 35),
('uuidRA012', 'uuidU012', 35),
('uuidRA013', 'uuidU013', 32),
('uuidRA014', 'uuidU014', 35),
('uuidRA015', 'uuidU015', 33.1),
('uuidRA016', 'uuidU016', 30),
('uuidRA017', 'uuidU017', 30),
('uuidRA018', 'uuidU018', 32),
('uuidRA019', 'uuidU019', 31),
('uuidRA020', 'uuidU020', 30);

INSERT INTO leftForearm(id, clientId, measurement) VALUES
('uuidLF001', 'uuidU003', 15.4),
('uuidLF002', 'uuidU004', 26),
('uuidLF003', 'uuidU003', 22),
('uuidLF004', 'uuidU004', 41),
('uuidLF005', 'uuidU005', 22),
('uuidLF006', 'uuidU006', 22),
('uuidLF007', 'uuidU007', 33),
('uuidLF008', 'uuidU008', 22),
('uuidLF009', 'uuidU009', 30),
('uuidLF010', 'uuidU010', 22),
('uuidLF011', 'uuidU011', 22),
('uuidLF012', 'uuidU012', 22),
('uuidLF013', 'uuidU013', 32),
('uuidLF014', 'uuidU014', 22),
('uuidLF015', 'uuidU015', 21),
('uuidLF016', 'uuidU016', 30),
('uuidLF017', 'uuidU017', 30),
('uuidLF018', 'uuidU018', 32),
('uuidLF019', 'uuidU019', 21),
('uuidLF020', 'uuidU020', 30);

INSERT INTO rightForearm(id, clientId, measurement) VALUES
('uuidRF001', 'uuidU001', 15.2),
('uuidRF002', 'uuidU002', 26),
('uuidRF003', 'uuidU003', 22),
('uuidRF004', 'uuidU004', 41),
('uuidRF005', 'uuidU005', 22),
('uuidRF006', 'uuidU006', 22),
('uuidRF007', 'uuidU007', 33),
('uuidRF008', 'uuidU008', 22),
('uuidRF009', 'uuidU009', 30),
('uuidRF010', 'uuidU010', 22),
('uuidRF011', 'uuidU011', 22),
('uuidRF012', 'uuidU012', 22),
('uuidRF013', 'uuidU013', 32),
('uuidRF014', 'uuidU014', 22),
('uuidRF015', 'uuidU015', 21),
('uuidRF016', 'uuidU016', 30),
('uuidRF017', 'uuidU017', 30),
('uuidRF018', 'uuidU018', 32),
('uuidRF019', 'uuidU019', 21),
('uuidRF020', 'uuidU020', 30);

INSERT INTO waist(id, clientId, measurement) VALUES
('uuidWT001', 'uuidU001', 65),
('uuidWT002', 'uuidU002', 75),
('uuidWT003', 'uuidU003', 70),
('uuidWT004', 'uuidU004', 60),
('uuidWT005', 'uuidU005', 70),
('uuidWT006', 'uuidU006', 70),
('uuidWT007', 'uuidU007', 72),
('uuidWT008', 'uuidU008', 70),
('uuidWT009', 'uuidU009', 79),
('uuidWT010', 'uuidU010', 70),
('uuidWT011', 'uuidU011', 70),
('uuidWT012', 'uuidU012', 70),
('uuidWT013', 'uuidU013', 66),
('uuidWT014', 'uuidU014', 70),
('uuidWT015', 'uuidU015', 69),
('uuidWT016', 'uuidU016', 79),
('uuidWT017', 'uuidU017', 79),
('uuidWT018', 'uuidU018', 66),
('uuidWT019', 'uuidU019', 59),
('uuidWT020', 'uuidU020', 80);

INSERT INTO hip(id, clientId, measurement) VALUES
('uuidHP001', 'uuidU001', 80),
('uuidHP002', 'uuidU002', 80),
('uuidHP003', 'uuidU003', 80),
('uuidHP004', 'uuidU004', 81),
('uuidHP005', 'uuidU005', 80),
('uuidHP006', 'uuidU006', 80),
('uuidHP007', 'uuidU007', 80),
('uuidHP008', 'uuidU008', 80),
('uuidHP009', 'uuidU009', 80),
('uuidHP010', 'uuidU010', 80),
('uuidHP011', 'uuidU011', 80),
('uuidHP012', 'uuidU012', 80),
('uuidHP013', 'uuidU013', 80),
('uuidHP014', 'uuidU014', 80),
('uuidHP015', 'uuidU015', 80),
('uuidHP016', 'uuidU016', 80),
('uuidHP017', 'uuidU017', 80),
('uuidHP018', 'uuidU018', 80),
('uuidHP019', 'uuidU019', 80),
('uuidHP020', 'uuidU020', 80);

INSERT INTO leftLeg(id, clientId, measurement) VALUES
('uuidLL001', 'uuidU001', 54.7),
('uuidLL002', 'uuidU002', 54.7),
('uuidLL003', 'uuidU003', 54.7),
('uuidLL004', 'uuidU004', 54),
('uuidLL005', 'uuidU005', 54.7),
('uuidLL006', 'uuidU006', 54.7),
('uuidLL007', 'uuidU007', 54.7),
('uuidLL008', 'uuidU008', 54.7),
('uuidLL009', 'uuidU009', 54.7),
('uuidLL010', 'uuidU010', 54.7),
('uuidLL011', 'uuidU011', 54.7),
('uuidLL012', 'uuidU012', 54.7),
('uuidLL013', 'uuidU013', 54.7),
('uuidLL014', 'uuidU014', 54.7),
('uuidLL015', 'uuidU015', 54.7),
('uuidLL016', 'uuidU016', 54.7),
('uuidLL017', 'uuidU017', 54.7),
('uuidLL018', 'uuidU018', 54.7),
('uuidLL019', 'uuidU019', 54.7),
('uuidLL020', 'uuidU020', 54.7);

INSERT INTO rightLeg(id, clientId, measurement) VALUES
('uuidRL001', 'uuidU001', 54.4),
('uuidRL002', 'uuidU002', 54.4),
('uuidRL003', 'uuidU003', 54.4),
('uuidRL004', 'uuidU004', 54),
('uuidRL005', 'uuidU005', 54.4),
('uuidRL006', 'uuidU006', 54.4),
('uuidRL007', 'uuidU007', 54.4),
('uuidRL008', 'uuidU008', 54.4),
('uuidRL009', 'uuidU009', 54.4),
('uuidRL010', 'uuidU010', 54.4),
('uuidRL011', 'uuidU011', 54.4),
('uuidRL012', 'uuidU012', 54.4),
('uuidRL013', 'uuidU013', 54.4),
('uuidRL014', 'uuidU014', 54.4),
('uuidRL015', 'uuidU015', 54.4),
('uuidRL016', 'uuidU016', 54.4),
('uuidRL017', 'uuidU017', 54.4),
('uuidRL018', 'uuidU018', 54.4),
('uuidRL019', 'uuidU019', 54.4),
('uuidRL020', 'uuidU020', 54.4);

INSERT INTO leftCalve(id, clientId, measurement) VALUES
('uuidLC001', 'uuidU001', 22.4),
('uuidLC002', 'uuidU002', 22.4),
('uuidLC003', 'uuidU003', 22.4),
('uuidLC004', 'uuidU004', 36),
('uuidLC005', 'uuidU005', 22.4),
('uuidLC006', 'uuidU006', 22.4),
('uuidLC007', 'uuidU007', 22.4),
('uuidLC008', 'uuidU008', 22.4),
('uuidLC009', 'uuidU009', 22.4),
('uuidLC010', 'uuidU010', 22.4),
('uuidLC011', 'uuidU011', 22.4),
('uuidLC012', 'uuidU012', 22.4),
('uuidLC013', 'uuidU013', 22.4),
('uuidLC014', 'uuidU014', 22.4),
('uuidLC015', 'uuidU015', 22.4),
('uuidLC016', 'uuidU016', 22.4),
('uuidLC017', 'uuidU017', 22.4),
('uuidLC018', 'uuidU018', 22.4),
('uuidLC019', 'uuidU019', 22.4),
('uuidLC020', 'uuidU020', 22.4);

INSERT INTO rightCalve(id, clientId, measurement) VALUES
('uuidRC001', 'uuidU001', 22.2),
('uuidRC002', 'uuidU002', 22.2),
('uuidRC003', 'uuidU003', 22.2),
('uuidRC004', 'uuidU004', 36),
('uuidRC005', 'uuidU005', 22.2),
('uuidRC006', 'uuidU006', 22.2),
('uuidRC007', 'uuidU007', 22.2),
('uuidRC008', 'uuidU008', 22.2),
('uuidRC009', 'uuidU009', 22.2),
('uuidRC010', 'uuidU010', 22.2),
('uuidRC011', 'uuidU011', 22.2),
('uuidRC012', 'uuidU012', 22.2),
('uuidRC013', 'uuidU013', 22.2),
('uuidRC014', 'uuidU014', 22.2),
('uuidRC015', 'uuidU015', 22.2),
('uuidRC016', 'uuidU016', 22.2),
('uuidRC017', 'uuidU017', 22.2),
('uuidRC018', 'uuidU018', 22.2),
('uuidRC019', 'uuidU019', 22.2),
('uuidRC020', 'uuidU020', 22.2);

INSERT INTO journalEntry(id, title, content, clientId) VALUES
('uuidJE001', 'Día de espalda', 'Hoy logré hacer mi primera dominada y me sentí muy fuerte', 'uuidU003'),
('uuidJE002', 'Dia de espalda', 'Logre hacer 8 muscle ups seguidos', 'uuidU004'),
('uuidJE003', 'Día de pecho', 'Por fin los 10kg en press de banca', 'uuidU009'),
('uuidJE004', 'Día de pierna', '+5kg en sentadilla', 'uuidU016'),
('uuidJE005', 'Día de hombro', 'Tuve una ligera molestia en el hombro después de hacer press militar parado', 'uuidU011'),
('uuidJE006', 'Día de brazo', 'Me encanta el press francés, lo incorporaré más a mis rutinas', 'uuidU018'),
('uuidJE007', 'Full body', 'Me siento algo débil, tal vez debería comer un poco antes de ir al gym', 'uuidU014'),
('uuidJE008', 'Día de abdomen', 'Me quema el abdomeeen, excelente rutina', 'uuidU015'),
('uuidJE009', 'Día de descanso', 'Estoy llena de energía, el ejercicio me está ayudando muchísimo', 'uuidU014'),
('uuidJE010', 'Día de pierna', 'Para hip thrust: llevar tenis que no se resbalen', 'uuidU017');

-- Estático
INSERT INTO rol(id, name) VALUES
('uuidR01', 'Administrador'),
('uuidR02', 'Cliente');

INSERT INTO clientRol(clientId, rolId) VALUES
('uuidU001', 'uuidR01'),
('uuidU002', 'uuidR01'),
('uuidU003', 'uuidR02'),
('uuidU004', 'uuidR01'),
('uuidU005', 'uuidR01'),
('uuidU006', 'uuidR01'),
('uuidU007', 'uuidR01'),
('uuidU008', 'uuidR01'),
('uuidU009', 'uuidR02'),
('uuidU010', 'uuidR02'),
('uuidU011', 'uuidR02'),
('uuidU012', 'uuidR02'),
('uuidU013', 'uuidR02'),
('uuidU014', 'uuidR02'),
('uuidU015', 'uuidR02'),
('uuidU016', 'uuidR02'),
('uuidU017', 'uuidR02'),
('uuidU018', 'uuidR02'),
('uuidU019', 'uuidR02'),
('uuidU020', 'uuidR02');

-- Estático
INSERT INTO service(id, name) VALUES
('uuidS01', 'Editar perfil'),
('uuidS02', 'Agregar medida'),
('uuidS03', 'Consultar medida'),
('uuidS04', 'Editar medida'),
('uuidS05', 'Eliminar medida'),
('uuidS06', 'Consultar progreso'),
('uuidS07', 'Consultar dieta'),
('uuidS08', 'Marcar dieta'),
('uuidS09', 'Desmarcar dieta'),
('uuidS10', 'Consultar ejercicio'),
('uuidS11', 'Consultar rutina'),
('uuidS12', 'Marcar rutina'),
('uuidS13', 'Desmarcar rutina'),
('uuidS14', 'Consultar entrada'),
('uuidS15', 'Agregar entrada'),
('uuidS16', 'Editar entrada'),
('uuidS17', 'Eliminar entrada'),
('uuidS18', 'Descargar entrada'),
('uuidS19', 'Agregar dieta'),
('uuidS20', 'Editar dieta'),
('uuidS21', 'Eliminar dieta'),
('uuidS22', 'Agregar ejercicio'),
('uuidS23', 'Editar ejercicio'),
('uuidS24', 'Eliminar ejercicio'),
('uuidS25', 'Agregar rutina'),
('uuidS26', 'Editar rutina'),
('uuidS27', 'Eliminar rutina'),
('uuidS28', 'Consultar usuarios'),
('uuidS29', 'Editar rol usuarios');

-- Estático
INSERT INTO rolService(rolId, serviceId) VALUES
('uuidR02', 'uuidS01'),
('uuidR02', 'uuidS02'),
('uuidR02', 'uuidS03'),
('uuidR02', 'uuidS04'),
('uuidR02', 'uuidS05'),
('uuidR02', 'uuidS06'),
('uuidR02', 'uuidS07'),
('uuidR02', 'uuidS08'),
('uuidR02', 'uuidS09'),
('uuidR02', 'uuidS10'),
('uuidR02', 'uuidS11'),
('uuidR02', 'uuidS12'),
('uuidR02', 'uuidS13'),
('uuidR02', 'uuidS14'),
('uuidR02', 'uuidS15'),
('uuidR02', 'uuidS16'),
('uuidR02', 'uuidS17'),
('uuidR02', 'uuidS18'),
('uuidR01', 'uuidS19'),
('uuidR01', 'uuidS20'),
('uuidR01', 'uuidS21'),
('uuidR01', 'uuidS22'),
('uuidR01', 'uuidS23'),
('uuidR01', 'uuidS24'),
('uuidR01', 'uuidS25'),
('uuidR01', 'uuidS26'),
('uuidR01', 'uuidS27'),
('uuidR01', 'uuidS28'),
('uuidR01', 'uuidS29');

-- Estático
INSERT INTO workoutLevel(id, name) VALUES
('uuidWL01', 'Principiante'),
('uuidWL02', 'Intermedio'),
('uuidWL03', 'Avanzado');

-- Estático
INSERT INTO workoutType(id, name) VALUES
('uuidWT001', 'Fuerza'),
('uuidWT002', 'Hipertrofia'),
('uuidWT003', 'Híbrido');

INSERT INTO workout(id, name, description, frequency, workoutLevelId, typeId) VALUES
('uuidWK001', '5-3-1 Jim Wendler', 'Un entrenamiento para ganar fuerza y masa muscular', 3, 'uuidWL02', 'uuidWT003'),
('uuidWK002', 'PPL', 'Push (Pecho|Hombros|Tricep), Pull(Espalda|Bicep), Legs(Piernas)', 1, 'uuidWL03', 'uuidWT002'),
('uuidWK003', '5x5', 'Un entrenamiento para ganar fuerza', 3, 'uuidWL02', 'uuidWT001'),
('uuidWK004', 'Prueba fisica', '300 sentadillas, 200 lagartijas, 100 pull-ups', 1, 'uuidWL02', 'uuidWT003'),
('uuidWK005', 'Tabata', 'Entrenamiento para ganar condicion fisica', 5, 'uuidWL03', 'uuidWT003'),
('uuidWK006', 'HIIT', 'Entrenamiento de intervalos de alta intensidad', 5, 'uuidWL03', 'uuidWT003'),
('uuidWK007', 'Full body', 'Un entrenamiento enfocado a todo el cuerpo', 3, 'uuidWL02', 'uuidWT001'),
('uuidWK008', 'GAP', 'Entrenamiento de Glúteos, piernas y abdomen', 3, 'uuidWL01', 'uuidWT003'),
('uuidWK009', 'Aeróbicos', 'Entrenamiento aeróbico', 3, 'uuidWL01', 'uuidWT003'),
('uuidWK010', 'Entrenamiento funcional', 'Entrenamiento enfocado en el movimiento natural del cuerpo', 3, 'uuidWL02', 'uuidWT003');

INSERT INTO workoutImage(id, idWorkout, imageId) VALUES
('uuidWI001', 'uuidWK001', 'uuidI008'),
('uuidWI002', 'uuidWK002', 'uuidI009'),
('uuidWI003', 'uuidWK003', 'uuidI010'),
('uuidWI004', 'uuidWK004', 'uuidI017'),
('uuidWI005', 'uuidWK005', 'uuidI017'),
('uuidWI006', 'uuidWK006', 'uuidI017'),
('uuidWI007', 'uuidWK007', 'uuidI017'),
('uuidWI008', 'uuidWK008', 'uuidI017'),
('uuidWI009', 'uuidWK009', 'uuidI017'),
('uuidWI010', 'uuidWK010', 'uuidI017');

INSERT INTO clientWorkout(clientId, workoutId) VALUES
('uuidU003', 'uuidWK001'),
('uuidU004', 'uuidWK002'),
('uuidU009', 'uuidWK002'),
('uuidU010', 'uuidWK003'),
('uuidU011', 'uuidWK002'),
('uuidU012', 'uuidWK001'),
('uuidU013', 'uuidWK002'),
('uuidU014', 'uuidWK003'),
('uuidU015', 'uuidWK003'),
('uuidU016', 'uuidWK001'),
('uuidU017', 'uuidWK001'),
('uuidU018', 'uuidWK002'),
('uuidU019', 'uuidWK003'),
('uuidU020', 'uuidWK003');

INSERT INTO excercise(id, name, description, imageId) VALUES
('uuidE001', 'Sentadilla', 'Músculos implicados: cuádriceps, glúteo mayor, isquiotibiales y aductores', 'uuidI004'),
('uuidE002', 'Press banca', 'Músculos implicados: pecho (sobre todo el pectoral mayor)', 'uuidI005'),
('uuidE003', 'Peso muerto', 'Zonas del cuerpo que se trabajan: isquiotibiales, cuádriceps, glúteos, músculos de la espalda y del hombro', 'uuidI006'),
('uuidE004', 'Press militar', 'Los músculos más implicados en el press militar con mancuernas son el deltoides anterior, la porción medial y los tríceps', 'uuidI007'),
('uuidE006', 'Press francés', 'Desarrolla los tríceps y al mismo tiempo el bíceps', 'uuidI012'),
('uuidE007', 'Dominadas estrictas', 'Algunos de los músculos que se trabajan son: dorsal mayor, dorsal, trapecio, romboides, pectoral mayor y menor, deltoides, infraespinoso, bíceps, bíceps braquial, oblicuo externo, tríceps y pectoral, entre otros', 'uuidI013'),
('uuidE008', 'Remo al pecho en máquina', 'Musculatura cervical: trapecio. Músculos del hombro: deltoides. Espalda superior: dorsal ancho y romboides mayor. Musculatura del brazo superior: bíceps', 'uuidI014'),
('uuidE009', 'Prensa', 'Músculos trabajados: cuádriceps, glúteos, isquiotibiales y pantorrillas', 'uuidI015'),
('uuidE010', 'Elevaciones de pierna en barra', 'Se trabajan de los abdominales el recto mayor del abdomen y los oblicuos', 'uuidI016'),
('uuidE011', 'Push-up', 'Se trabaja el pecho y los triceps', 'uuidI016');


INSERT INTO tag(workoutId, exerciseId) VALUES
('uuidWK001', 'uuidE001'),
('uuidWK001', 'uuidE002'),
('uuidWK001', 'uuidE003'),
('uuidWK001', 'uuidE004'),
('uuidWK002', 'uuidE004'),
('uuidWK002', 'uuidE006'),
('uuidWK002', 'uuidE007'),
('uuidWK002', 'uuidE008'),
('uuidWK002', 'uuidE001'),
('uuidWK002', 'uuidE009'),
('uuidWK003', 'uuidE001'),
('uuidWK003', 'uuidE002'),
('uuidWK003', 'uuidE003'),
('uuidWK004', 'uuidE007'),
('uuidWK004', 'uuidE001'),
('uuidWK004', 'uuidE010');



INSERT INTO diet(id, name, calories) VALUES
('uuidD001', '1500', 1500),
('uuidD002', '2000', 2000),
('uuidD003', '2500', 2500),
('uuidD004', '3000', 3000),
('uuidD005', '3500', 3500),
('uuidD006', '4000', 4000),
('uuidD007', '1500a', 1500),
('uuidD008', '2000a', 2000),
('uuidD009', '2500a', 2500),
('uuidD010', '3000a', 3000);

INSERT INTO clientDiet(clientId, dietId) VALUES
('uuidU003', 'uuidD001'),
('uuidU003', 'uuidD002'),
('uuidU003', 'uuidD003'),
('uuidU004', 'uuidD004'),
('uuidU001', 'uuidD005'),
('uuidU001', 'uuidD006');

-- Se ingresan los datos de los ingredientes por cada 100 gramos
INSERT INTO ingredient(id, name, carbs, fat, protein) VALUES
-- Lacteos
('uuidIG001', 'Leche de vaca fluida', 1, 1.1, 0.8),
('uuidIG002', 'Queso', 1, 1.1, 0.8),

-- Huevo
('uuidIG003', 'Huevo de gallina entero', 1, 1.1, 0.8),
('uuidIG017', 'Claras de huevo', 1, 0.2, 11),

-- Carnes
('uuidIG004', 'Pollo magro cocido', 1, 1.1, 0.8),
('uuidIG016', 'Jamón', 1, 1.1, 0.8),
('uuidIG018', 'Hamburguesa', 0.5, 18.3, 14),
('uuidIG019', 'Chorizo', 2, 31, 12.5),

-- Vegetales
('uuidIG006', 'Zanahoria cocida', 1, 1.1, 0.8),
('uuidIG007', 'Brócoli', 1, 1.1, 0.8),
('uuidIG020', 'Papa', 17.1, 0.1, 2.1),

-- Cereales
('uuidIG009', 'Arroz cocido', 1, 1.1, 0.8),
('uuidIG021', 'Ce', 1, 1.1, 0.8),

-- Frutas
('uuidIG011', 'Plátanos', 1, 1.1, 0.8),
('uuidIG015', 'Manzanas', 1, 1.1, 0.8),

-- Legumbres
('uuidIG005', 'Frijol cocido', 1, 1.1, 0.8),

-- Grasas
('uuidIG010', 'Aceite de oliva', 1, 1.1, 0.8),

-- Nueces
('uuidIG012', 'Almendras', 1, 1.1, 0.8),
('uuidIG013', 'Nuez de nogal, seca', 1, 1.1, 0.8),

-- Harinas
('uuidIG014', 'Tortilla de maíz blanco', 1, 1.1, 0.8),
('uuidIG008', 'Pan integral', 1, 1.1, 0.8);


INSERT INTO dietIngredient(dietId, ingredientId, quantity, unit) VALUES
('uuidD001', 'uuidIG001', 500, 'g'),
('uuidD001', 'uuidIG002', 40, 'g'),
('uuidD001', 'uuidIG003', 3, 'pza'),
('uuidD001', 'uuidIG004', 120, 'g'),
('uuidD001', 'uuidIG005', 200, 'g'),
('uuidD001', 'uuidIG006', 100, 'g'), 
('uuidD001', 'uuidIG007', 100, 'g'),
('uuidD001', 'uuidIG008', 2, 'pza'),
('uuidD001', 'uuidIG009', 120, 'g'),
('uuidD001', 'uuidIG010', 1, 'cda'),
('uuidD001', 'uuidIG011', 1, 'pza'),
('uuidD001', 'uuidIG012', 15, 'g'),
('uuidD001', 'uuidIG013', 15, 'g'),
('uuidD001', 'uuidIG014', 4, 'pza'),
('uuidD001', 'uuidIG015', 1, 'pza'),
('uuidD001', 'uuidIG016', 100, 'g'),
('uuidD002', 'uuidIG007', 100, 'g'),
('uuidD003', 'uuidIG008', 2, 'pza'),
('uuidD004', 'uuidIG009', 120, 'g'),
('uuidD005', 'uuidIG010', 1, 'cda'),
('uuidD006', 'uuidIG011', 1, 'pza'),
('uuidD007', 'uuidIG012', 15, 'g'),
('uuidD008', 'uuidIG013', 15, 'g'),
('uuidD009', 'uuidIG014', 4, 'pza'),
('uuidD010', 'uuidIG015', 1, 'pza');

-- Estático
INSERT INTO micros(id, name) VALUES
('uuidM01', 'Fibra total'),
('uuidM02', 'Ceniza'),
('uuidM03', 'Calcio'),
('uuidM04', 'Fósforo'),
('uuidM05', 'Hierro'),
('uuidM06', 'Tiamina'),
('uuidM07', 'Riboflavina'),
('uuidM08', 'Niacina'),
('uuidM09', 'Vitamina C'),
('uuidM10', 'Vitamina A'),
('uuidM011', 'Ácidos Grasos mono-in'),
('uuidM012', 'Ácidos Grasos poli'),
('uuidM013', 'Ácidos Grasos saturados'),
('uuidM014', 'Colesterol'),
('uuidM015', 'Potasio'),
('uuidM016', 'Sodio'),
('uuidM017', 'Zinc'),
('uuidM018', 'Magnesio'),
('uuidM019', 'Vitamina B6'),
('uuidM020', 'Vitamina B12'),
('uuidM021', 'Ácido fólico'),
('uuidM022', 'Folato Eq.');

INSERT INTO microsIngredient(microsId, ingredientId, microsPerGram) VALUES
('uuidM01', 'uuidIG001', 30),
('uuidM02', 'uuidIG001', 20),
('uuidM03', 'uuidIG001', 50),
('uuidM04', 'uuidIG001', 11),
('uuidM05', 'uuidIG001', 3),
('uuidM06', 'uuidIG001', 7),
('uuidM07', 'uuidIG001', 30),
('uuidM08', 'uuidIG001', 30),
('uuidM01', 'uuidIG002', 30),
('uuidM02', 'uuidIG002', 30),
('uuidM03', 'uuidIG002', 30),
('uuidM04', 'uuidIG002', 30),
('uuidM05', 'uuidIG002', 30),
('uuidM06', 'uuidIG002', 30),
('uuidM07', 'uuidIG002', 30),
('uuidM08', 'uuidIG002', 30);
