import Diet from "../../models/Dietas/diets.models"
import type { IDiet } from "../../interfaces/Diet.interface";

export const getAll = async (req: any, res: any) => {
    try {
        // ----------------- TOP 3 -----------------
        const rowsFavs = await Diet.fetchTop3(req.user.id);

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
        const {
            calories,
            ingredient
        } = req.query;

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

        const rowsIsFav = await Diet.isFav(req.user.id);
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


        return res.json({
            msg: "",
            data: {
                top3: Object.values(favDiets),
                diets: Object.values(diets),
                favs: favs_list,
                calories: calories_list
            }
        });

    } catch (error) {
        console.log(error);

        return res.json({
            msg: "",
            data: {
                top3: [],
                diets: [],
                favs: [],
                calories: []
            }
        });
    }
}

export const getAllFavs = async (req: any, res: any) => {
    try {
        // ----------------- FAVS -----------------
        const {
            calories,
            ingredient
        } = req.query;
        
        const rowsFavs = await Diet.findAllFavs(req.user.id, {
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

        return res.json({
            msg: "",
            data: {
                diets: Object.values(favs),
                calories: calories_list
            }
        });

    } catch (error) {
        console.log(error);

        return res.json({
            msg: "",
            data: {
                diets: [],
                calories: []
            }
        });
    }
}

export const getDiet = async (req: any, res: any) => {
    try {
        const rowsDiet = await Diet.findInfo('UUIDU001', 'UUIDD001') // Datos prueba

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

        return res.json({
            msg: "",
            data: {
                diet: diet
            }
        })

    } catch (error) {
        console.log(error);

        return res.json({
            msg: "",
            data: {
                diets: []
            }
        });
    }
}