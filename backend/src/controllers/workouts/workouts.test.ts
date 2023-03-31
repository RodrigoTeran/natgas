import 'jest';
import {
  likeUnlikeLogic,
} from "./workouts.controller";

const userId: string = 'f65eb37d-5119-56fb-988a-1f465b0ca756';

// test('workouts get all favorites with userId', () => {
//   return getAllFavsLogic(userId).then(data => {
//       expect(data).toStrictEqual("Usuario valido");
//   });
// });

// test('workouts get all favorites with userId undefined', () => {
//   return getAllFavsLogic(undefined).then(data => {
//       expect(data).toStrictEqual("Usuario inválido");
//   });
// });

// Get favorite state

test('workouts get favorite state with undifined params', () => {
  return likeUnlikeLogic(undefined, undefined).then(data => {
    expect(data).toStrictEqual("Datos invalidos");
  });
});

test('workouts get favorite state with userId undefined', () => {
  return likeUnlikeLogic(undefined, 'uuidW001').then(data => {
    expect(data).toStrictEqual("Datos invalidos");
  });
});

test('workouts get favorite state with workoutId undefined', () => {
  return likeUnlikeLogic(userId, undefined).then(data => {
    expect(data).toStrictEqual("Datos invalidos");
  });
});

test('workouts get favorite state with workoutId invalid', () => {
  return likeUnlikeLogic(userId, '001').then(data => {
    expect(data).toStrictEqual("Error al obtener los workouts");
  });
});

test('workouts get favorite state with userId invalid', () => {
  return likeUnlikeLogic('abcd', 'uuidW001').then(data => {
    expect(data).toStrictEqual("Error al obtener los workouts");
  });
});

test('workouts get favorite state with workoutId valid', () => {
  return likeUnlikeLogic(userId, 'uuidWK001').then(data => {
    expect(data).toStrictEqual(true);
  });
});


