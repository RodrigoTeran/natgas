import Diet from "../../models/Dietas/diets.models"
import type { IDiet } from "../../interfaces/Diet.interface";

export const getAllLogic = async (userId: string, calories: string, ingredient: string) => {
    try {
        if (calories === undefined) {
            return "Debes de pasar las calorías";
        }
        if (ingredient === undefined) {
            return "Debes de pasar el ingrediente";
        }
        if (typeof calories !== "string") {
            return "Las calorías son invalidas";
        }
        if (typeof ingredient !== "string") {
            return "El ingrediente es inválido";
        }
        if (userId === undefined) {
            return "Usuario inválido";
        }

        // ----------------- TOP 3 -----------------
        const rowsFavs = await Diet.fetchTop3(userId);

        const favDiets: {
            [key: string]: IDiet
        } = {};

        for (let i = 0; i < rowsFavs.length; i++) {
            const d: any = rowsFavs[i];

            favDiets[d.id] = {
                ...d,
                micros: {},
                ingredients: [],
                liked: favDiets[d.id]?.liked || d.liked
            }
        }

        // ----------------- ALL DIETS -----------------
        const rowsDiets = await Diet.findAll({
            calories,
            ingredient
        });

        const diets: {
            [key: string]: IDiet
        } = {};

        for (let i = 0; i < rowsDiets.length; i++) {
            const d: any = rowsDiets[i];

            diets[d.id] = {
                ...d,
                micros: {},
                ingredients: [],
                liked: diets[d.id]?.liked || d.liked
            }
        }

        // ----------------- IS FAV -----------------

        const rowsIsFav = await Diet.isFav(userId);
        const favs_list: string[] = [];

        for (let i = 0; i < rowsIsFav.length; i++) {
            const f: any = rowsIsFav[i];

            favs_list.push(f.id);
        }

        // ----------------- CALORIES -----------------

        const rowsCalories = await Diet.findCalories();
        const calories_list: string[] = [];

        for (let i = 0; i < rowsCalories.length; i++) {
            const c: any = rowsCalories[i];

            calories_list.push(c.calories);
        }


        return {
            top3: Object.values(favDiets),
            diets: Object.values(diets),
            favs: favs_list,
            calories: calories_list
        };

    } catch (error) {
        console.log(error);

        return "Error del servidor";
    }
}

export const getAll = async (req: any, res: any) => {
    try {
        const {
            calories,
            ingredient
        } = req.query;


        const data = await getAllLogic(req.user.id, calories, ingredient);

        if (typeof data === "string") {
            return res.json({
                msg: data,
                data: {
                    top3: [],
                    diets: [],
                    favs: [],
                    calories: []
                },
                auth: true
            });
        }

        return res.json({
            msg: "",
            data,
            auth: true
        });

    } catch (error) {
        console.log(error);

        return res.json({
            msg: "Error del servidor",
            data: {
                top3: [],
                diets: [],
                favs: [],
                calories: []
            },
            auth: true
        });
    }
}

export const getAllFavsLogic = async (userId: string, calories: string, ingredient: string) => {
    try {
        if (calories === undefined) {
            return "Debes de pasar las calorías";
        }
        if (ingredient === undefined) {
            return "Debes de pasar el ingrediente";
        }
        if (typeof calories !== "string") {
            return "Las calorías son invalidas";
        }
        if (typeof ingredient !== "string") {
            return "El ingrediente es inválido";
        }
        if (userId === undefined) {
            return "Usuario inválido";
        }

        // ----------------- FAVS -----------------
        const rowsFavs = await Diet.findAllFavs(userId, {
            calories,
            ingredient
        });

        const favs: {
            [key: string]: IDiet
        } = {};

        for (let i = 0; i < rowsFavs.length; i++) {
            const d: any = rowsFavs[i];

            favs[d.id] = {
                ...d,
                micros: {},
                ingredients: [],
                liked: true
            }
        }

        // ----------------- CALORIES -----------------

        const rowsCalories = await Diet.findCalories();
        const calories_list: string[] = [];

        for (let i = 0; i < rowsCalories.length; i++) {
            const c: any = rowsCalories[i];

            calories_list.push(c.calories);
        }

        return {
            diets: Object.values(favs),
            calories: calories_list
        }

    } catch (error) {
        console.log(error);

        return "Error del servidor";
    }
}

export const getAllFavs = async (req: any, res: any) => {
    try {
        // ----------------- FAVS -----------------
        const {
            calories,
            ingredient
        } = req.query;

        const data = await getAllFavsLogic(req.user.id, calories, ingredient);

        if (typeof data === "string") {
            return res.json({
                msg: data,
                data: {
                    diets: [],
                    calories: []
                },
                auth: true
            });
        }

        return res.json({
            msg: "",
            data,
            auth: true
        });

    } catch (error) {
        console.log(error);

        return res.json({
            msg: "",
            data: {
                diets: [],
                calories: []
            },
            auth: true
        });
    }
}

export const getDietLogic = async (clientId: string, dietId: string) => {
    try {

        if (clientId === undefined) {
            return "El cliente es inválido";
        }
        if (dietId === undefined) {
            return "La dieta es inválida";
        }
        if (typeof clientId !== "string") {
            return "El cliente es inválido";
        }
        if (typeof dietId !== "string") {
            return "La dieta es inválida";
        }

        // ----------------- IS FAV -----------------

        const rowsIsFav = await Diet.isFav(clientId);
        const favs_list: string[] = [];

        for (let i = 0; i < rowsIsFav.length; i++) {
            const f: any = rowsIsFav[i];

            favs_list.push(f.id);
        }

        // ----------------- FIND INFO -----------------
        const rowsDiet = await Diet.findInfo(clientId, dietId);

        let diet = {} as IDiet;
        let ingredients: string[] = [];

        for (let i = 0; i < rowsDiet.length; i++) {
            const d: any = rowsDiet[i];

            let aux:
                {
                    name: string,
                    quantity: string,
                    unit: string
                } =
            {
                name: d.ingredient,
                quantity: d.quantity,
                unit: d.unit
            };

            ingredients.push(JSON.stringify(aux));

            diet = {
                ...d,
                ingredients: ingredients,
                liked: diet?.liked || d.liked
            }

        }

        return {
            diet: diet,
            liked: favs_list.indexOf(dietId),
        };

    } catch (error) {
        console.log(error);

        return "Error del servidor";
    }
}

export const getDiet = async (req: any, res: any) => {
    try {
        const {
            dietId
        } = req.query;
        
        const data = await getDietLogic(req.user.id, dietId)

        if (typeof data === "string") {
            return res.json({
                msg: data,
                data: {
                    diet: [],
                    liked: null
                },
                auth: true
            });
        }
        
        return res.json({
            msg: "",
            data,
            auth: true
        })

    } catch (error) {
        console.log(error);

        return res.json({
            msg: "",
            data: {
                diet: [],
                liked: null
            },
            auth: true
        });
    }
}

export const setDietStatus = async (req: any, res: any) => {
    try {
        const {
            status,
            dietId
        } = req.query;

        if(status === 'true') {
            await Diet.addFav(req.user.id, dietId);
        } else {
            await Diet.removeFav(req.user.id, dietId);
        }

        return res.json({
            msg: "",
            data: [],
            auth: true
        });
        
    } catch (error) {
        console.log(error);

        return res.json({
            msg: "El cambio en el estatus de la dieta deseada no pudo ser ejecutado",
            data: [],
            auth: true
        });
    }
}

export const postDiet = async (req: any, res: any) => {
    console.log('CONTROLLER');
    console.log(req);
}