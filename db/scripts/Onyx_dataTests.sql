INSERT INTO client(id, username, authProvider, authProviderId, sex, dateOfBirth, imageId) VALUES
('uuidU001', 'raulFlores', 'facebook', 'FUIDC001', 'M', '1990-01-01', 'uuidI001'),
('uuidU002', 'manuelFlores', 'google', 'GUIDC001', 'M', '1990-01-01', 'uuidI002'),
('uuidU003', 'domi', 'google', 'GUIDC002', 'F', '2000-12-20', 'uuidI002');

-- Estático
INSERT INTO physicLevel(id, name) VALUES
('uuidPL001', 'Sedentario'),
('uuidPL002', 'Ejercicio 2 veces por semana')
('uuidPL003', 'Caminata diaria'),
('uuidPL004', '4-5 días de gym'),
('uuidPL005', 'Alto rendimiento');

INSERT INTO clientLevel(clientId, physicLevelId) VALUES
('uuidU001', 'uuidPL005'),
('uuidU002', 'uuidPL004'),
('uuidU003', 'uuidPL004');

-- Estático
INSERT INTO goal(id, name) VALUES
('uuidG001', 'Subir de peso'),
('uuidG002', 'Mantener peso'),
('uuidG003', 'Bajar de peso');

INSERT INTO clientGoal(clientId, goalId) VALUES
('uuidU001', 'uuidG002'),
('uuidU002', 'uuidG001'),
('uuidU003', 'uuidG001');

INSERT INTO weight(id, clientId, measurement) VALUES
('uuidW001', 'uuidU003', 63.7);

INSERT INTO height(id, clientId, measurement) VALUES
('uuidH001', 'uuidU003', 1.65);

INSERT INTO neck(id, clientId, measurement) VALUES
('uuidN001', 'uuidU003', 41.3);

INSERT INTO chest(id, clientId, measurement) VALUES
('uuidC001', 'uuidU003', 84.7);

INSERT INTO leftArm(id, clientId, measurement) VALUES
('uuidLA001', 'uuidU003', 27.1);

INSERT INTO rightArm(id, clientId, measurement) VALUES
('uuidRA001', 'uuidU003', 27.5);

INSERT INTO leftForearm(id, clientId, measurement) VALUES
('uuidLF001', 'uuidU003', 15.4);

INSERT INTO rightForearm(id, clientId, measurement) VALUES
('uuidRF001', 'uuidU003', 15.2);

INSERT INTO waist(id, clientId, measurement) VALUES
('uuidWT001', 'uuidU003', 65);

INSERT INTO hip(id, clientId, measurement) VALUES
('uuidHP001', 'uuidU003', 80);

INSERT INTO leftLeg(id, clientId, measurement) VALUES
('uuidLL001', 'uuidU003', 55.7);

INSERT INTO rightLeg(id, clientId, measurement) VALUES
('uuidRL001', 'uuidU003', 55.4);

INSERT INTO leftCalve(id, clientId, measurement) VALUES
('uuidLC001', 'uuidU003', 22.4);

INSERT INTO rightCalve(id, clientId, measurement) VALUES
('uuidRC001', 'uuidU003', 22.2);

INSERT INTO journalEntry(id, title, content, clientId) VALUES
('uuidJE001', 'Día de espalda', 'Hoy logré hacer mi primera dominada y me sentí muy fuerte', 'uuidU003')

-- Estático
INSERT INTO rol(id, name) VALUES
('uuidR01', 'Administrador'),
('uuidR02', 'Cliente');


INSERT INTO clientRol(clientId, rolId) VALUES
('uuidU001', 'uuidR01'),
('uuidU002', 'uuidR01'),
('uuidU003', 'uuidR02');

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

INSERT INTO image(id, src) VALUES
('uuidI001', 'https://static.vecteezy.com/system/resources/previews/011/336/914/original/gym-and-fitness-logo-png.png'),
('uuidI002', 'https://static.vecteezy.com/system/resources/previews/011/319/007/original/gym-and-fitness-logo-png.png'),
('uuidI003', 'https://e7.pngegg.com/pngimages/447/997/png-clipart-physical-fitness-logo-fitness-centre-woman-dumbbell-fitness-woman-business-woman-fitness.png'),
('uuidI004', 'https://i.blogs.es/1fd119/sentadilla/1366_2000.jpg'),
('uuidI005', 'https://i.blogs.es/85d668/bench-press-1/450_1000.webp'),
('uuidI006', 'https://www.entrenamientos.com/media/cache/exercise_375/uploads/exercise/peso-muerto-con-barra-tradicional-init-pos-4394.png'),
('uuidI007', 'https://cdn.shopify.com/s/files/1/0269/5551/3900/files/Seated-Barbell-Shoulder-Press_600x600.png?v=1619977796'),
('uuidI008', 'https://i.ytimg.com/vi/R38OvrWZLSw/hqdefault.jpg');

INSERT INTO workoutImage(id, idWorkout, imageId) VALUES
('uuidWI001', 'uuidWK001', 'uuidI008');

INSERT INTO workout(id, name, description, frequency, workoutLevelId, typeId) VALUES
('uuidWK001', '5-3-1 Jim Wendler', 'Un entrenamiento para ganar fuerza y masa muscular', 3, 'uuidWL02', 'uuidWT003');

INSERT INTO clientWorkout(clientId, workoutId) VALUES
('uuidU003', 'uuidWK001');

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

INSERT INTO excercise(id, name, description, imageId) VALUES
('uuidE001', 'Sentadilla', 'Músculos implicados: cuádriceps, glúteo mayor, isquiotibiales y aductores', 'uuidI004'),
('uuidE002', 'Press banca', 'Músculos implicados: pacho (sobre todo el pectoral mayor)', 'uuidI005'),
('uuidE003', 'Peso muerto', 'Zonas del cuerpo que se trabajan: isquiotibiales, cuádriceps, glúteos, músculos de la espalda y del hombro', 'uuidI006'),
('uuidE004', 'Press militar', 'Los músculos más implicados en el press militar con mancuernas son el deltoides anterior, la porción medial y los tríceps', 'uuidI007');

INSERT INTO tag(workoutId, exerciseId) VALUES
('uuidWK001', 'uuidE001'),
('uuidWK001', 'uuidE002'),
('uuidWK001', 'uuidE003'),
('uuidWK001', 'uuidE004');

INSERT INTO diet(id, name, calories) VALUES
('uuidD001', '1500 Calorias', 1500);

INSERT INTO clientDiet(clientId, dietId) VALUES
('uuidU003', 'uuidD001');

INSERT INTO ingredient(id, name, carbs, fat, protein) VALUES
('uuidIG001', 'Leche de vaca fluida', 1, 1.1, 0.8),
('uuidIG002', 'Queso', 1, 1.1, 0.8),
('uuidIG003', 'Huevo de gallina entero', 1, 1.1, 0.8),
('uuidIG004', 'Pollo magro cocido', 1, 1.1, 0.8),
('uuidIG005', 'Frijol cocido', 1, 1.1, 0.8),
('uuidIG006', 'Zanahoria cocida', 1, 1.1, 0.8), 
('uuidIG007', 'Brócoli', 1, 1.1, 0.8),
('uuidIG008', 'Pan integral', 1, 1.1, 0.8),
('uuidIG009', 'Arroz cocido', 1, 1.1, 0.8),
('uuidIG010', 'Aceite de oliva', 1, 1.1, 0.8),
('uuidIG011', 'Plátanos', 1, 1.1, 0.8),
('uuidIG012', 'Almendras', 1, 1.1, 0.8),
('uuidIG013', 'Nuez de nogal, seca', 1, 1.1, 0.8),
('uuidIG014', 'Tortilla de maíz blanco', 1, 1.1, 0.8),
('uuidIG015', 'Manzanas', 1, 1.1, 0.8),
('uuidIG016', 'Jamón', 1, 1.1, 0.8);


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
('uuidD001', 'uuidIG016', 100, 'g');

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
('uuidM021', 'Folato Eq.');

INSERT INTO microsIngredient(microsId, ingredientId, microsPerGram) VALUES
('uuidM01', 'uuidIG001', 30),
('uuidM02', 'uuidIG001', 30),
('uuidM03', 'uuidIG001', 30),
('uuidM04', 'uuidIG001', 30),
('uuidM05', 'uuidIG001', 30),
('uuidM06', 'uuidIG001', 30),
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



