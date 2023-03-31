import 'jest';
import {
    getAllLogic,
    getAllFavsLogic,
    getDietLogic
} from "./diets.controller";

const userId: string = 'f65eb37d-5119-56fb-988a-1f465b0ca756';

test('diets getAll', () => {
    return getAllLogic('f65eb37d-5119-56fb-988a-1f465b0ca756', 0, "").then(data => {
        expect(data).toStrictEqual({
            "calories": [
                1500,
                2000,
                2500,
                3000,
                3500,
                4000,
            ],
            "diets": [
                {
                    "calories": 1500,
                    "id": "uuidD001",
                    "ingredients": [],
                    "liked": undefined,
                    "macros": "[{\"proteina\": [\"2g\", \"7g\"], \"grasas\": [\"5g\", \"4g\"], \"carbohidratos\": [\"4g\", \"3g\"]}]",
                    "micros": {},
                    "name": "1500",
                },
                {
                    "calories": 2000,
                    "id": "uuidD002",
                    "ingredients": [],
                    "liked": undefined,
                    "macros": "[{\"proteina\": [\"6g\", \"5g\"], \"grasas\": [\"5g\", \"1g\"], \"carbohidratos\": [\"7g\", \"3g\"]}]",
                    "micros": {},
                    "name": "2000",
                },
                {
                    "calories": 2500,
                    "id": "uuidD003",
                    "ingredients": [],
                    "liked": undefined,
                    "macros": "[{\"proteina\": [\"6g\", \"5g\"], \"grasas\": [\"7g\", \"8g\"], \"carbohidratos\": [\"7g\", \"8g\"]}]",
                    "micros": {},
                    "name": "2500",
                },
                {
                    "calories": 3000,
                    "id": "uuidD004",
                    "ingredients": [],
                    "liked": undefined,
                    "macros": "[{\"proteina\": [\"1g\", \"5g\"], \"grasas\": [\"5g\", \"4g\"], \"carbohidratos\": [\"4g\", \"1g\"]}]",
                    "micros": {},
                    "name": "3000",
                },
                {
                    "calories": 3500,
                    "id": "uuidD005",
                    "ingredients": [],
                    "liked": undefined,
                    "macros": "[{\"proteina\": [\"6g\", \"5g\"], \"grasas\": [\"2g\", \"4g\"], \"carbohidratos\": [\"7g\", \"3g\"]}]",
                    "micros": {},
                    "name": "3500",
                },
                {
                    "calories": 4000,
                    "id": "uuidD006",
                    "ingredients": [],
                    "liked": undefined,
                    "macros": "[{\"proteina\": [\"6g\", \"5g\"], \"grasas\": [\"2g\", \"4g\"], \"carbohidratos\": [\"2g\", \"3g\"]}]",
                    "micros": {},
                    "name": "4000",
                },
            ],
            "favs": [
                "uuidD005",
                "uuidD006",
            ],
            "top3": [
                {
                    "calories": 3500,
                    "id": "uuidD005",
                    "ingredients": [],
                    "liked": undefined,
                    "macros": "[{\"proteina\": [\"6g\", \"5g\"], \"grasas\": [\"2g\", \"4g\"], \"carbohidratos\": [\"7g\", \"3g\"]}]",
                    "micros": {},
                    "name": "3500",
                },
                {
                    "calories": 4000,
                    "id": "uuidD006",
                    "ingredients": [],
                    "liked": undefined,
                    "macros": "[{\"proteina\": [\"6g\", \"5g\"], \"grasas\": [\"2g\", \"4g\"], \"carbohidratos\": [\"2g\", \"3g\"]}]",
                    "micros": {},
                    "name": "4000",
                },
            ],
        });
    });
});

test('diets getAll with undefined calories', () => {
    return getAllLogic(userId, undefined, "").then(data => {
        expect(data).toStrictEqual("Debes de pasar las calorías");
    });
});

test('diets getAll with undefined ingredient', () => {
    return getAllLogic(userId, 0, undefined).then(data => {
        expect(data).toStrictEqual("Debes de pasar el ingrediente");
    });
});

test('diets getAll with both undefined', () => {
    return getAllLogic(userId, undefined, undefined).then(data => {
        expect(data).toStrictEqual("Debes de pasar las calorías");
    });
});

test('diets getAll with client undefined', () => {
    return getAllLogic(undefined, 0, "").then(data => {
        expect(data).toStrictEqual("Usuario inválido");
    });
});

test('diets getAll with calories with another type', () => {
    const calories: any = "0";

    return getAllLogic(undefined, calories, "").then(data => {
        expect(data).toStrictEqual("Las calorías deben ser string");
    });
});

test('diets getAll with ingredient with another type', () => {
    const ingredient: any = 0;

    return getAllLogic(undefined, 0, ingredient).then(data => {
        expect(data).toStrictEqual("El ingrediente es inválido");
    });
});

test('diets getAllFavs', () => {
    return getAllFavsLogic('f65eb37d-5119-56fb-988a-1f465b0ca756', 0, "").then(data => {
        expect(data).toStrictEqual({
            diets: [
                {
                    id: 'uuidD005',
                    name: '3500',
                    calories: 3500,
                    macros: '[{"proteina": ["6g", "5g"], "grasas": ["2g", "4g"], "carbohidratos": ["7g", "3g"]}]',
                    micros: {},
                    ingredients: [],
                    liked: true
                },
                {
                    id: 'uuidD006',
                    name: '4000',
                    calories: 4000,
                    macros: '[{"proteina": ["6g", "5g"], "grasas": ["2g", "4g"], "carbohidratos": ["2g", "3g"]}]',
                    micros: {},
                    ingredients: [],
                    liked: true
                }
            ],
            calories: [1500, 2000, 2500, 3000, 3500, 4000]
        });
    });
});

test('diets getAllFavs with undefined calories', () => {
    return getAllFavsLogic(userId, undefined, "").then(data => {
        expect(data).toStrictEqual("Debes de pasar las calorías");
    });
});

test('diets getAllFavs with undefined ingredient', () => {
    return getAllFavsLogic(userId, 0, undefined).then(data => {
        expect(data).toStrictEqual("Debes de pasar el ingrediente");
    });
});

test('diets getAllFavs with both undefined', () => {
    return getAllFavsLogic(userId, undefined, undefined).then(data => {
        expect(data).toStrictEqual("Debes de pasar las calorías");
    });
});

test('diets getAllFavs with client undefined', () => {
    return getAllFavsLogic(undefined, 0, "").then(data => {
        expect(data).toStrictEqual("Usuario inválido");
    });
});

test('diets getAllFavs with calories with another type', () => {
    const calories: any = "0";

    return getAllFavsLogic(undefined, calories, "").then(data => {
        expect(data).toStrictEqual("Las calorías deben ser string");
    });
});

test('diets getAllFavs with ingredient with another type', () => {
    const ingredient: any = 0;

    return getAllFavsLogic(undefined, 0, ingredient).then(data => {
        expect(data).toStrictEqual("El ingrediente es inválido");
    });
});

test('diets getDiet ', () => {
    return getDietLogic('UUIDU001', 'UUIDD001').then(data => {
        expect(data).toStrictEqual({
            "diet": {
                "calories": 1500,
                "id": "uuidD001",
                "ingredient": "Tocino",
                "ingredients": [
                    "{\"name\":\"Elote\",\"quantity\":100,\"unit\":\"g\"}",
                    "{\"name\":\"Huevo\",\"quantity\":2,\"unit\":\"pza\"}",
                    "{\"name\":\"Leche\",\"quantity\":300,\"unit\":\"ml\"}",
                    "{\"name\":\"Pepino\",\"quantity\":0.5,\"unit\":\"pza\"}",
                    "{\"name\":\"Pollo\",\"quantity\":100,\"unit\":\"g\"}",
                    "{\"name\":\"Queso\",\"quantity\":50,\"unit\":\"g\"}",
                    "{\"name\":\"Tocino\",\"quantity\":50,\"unit\":\"g\"}"
                ],
                "liked": 0,
                "macros": "[{\"proteina\": [\"2g\", \"7g\"], \"grasas\": [\"5g\", \"4g\"], \"carbohidratos\": [\"4g\", \"3g\"]}]",
                "micros": "[{\"calcio\": [\"2μg\", \"2μg\"], \"Vitamina A\": [\"7μg\", \"2μg\"]}]",
                "name": "1500",
                "quantity": 50,
                "unit": "g"
            }
        });
    });
});

test('diets getDiet clientId undefined', () => {
    return getDietLogic(undefined, 'UUIDD001').then(data => {
        expect(data).toStrictEqual("El cliente es inválido");
    });
});

test('diets getDiet dietId undefined', () => {
    return getDietLogic('UUIDU001', undefined).then(data => {
        expect(data).toStrictEqual("La dieta es inválida");
    });
});
