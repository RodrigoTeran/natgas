import Diet from "../../models/Dietas/diets.models"
import type { IDiet } from "../../interfaces/Diet.interface";

export const getAll = async (req: any, res: any) => {
    try {
        // ----------------- TOP 3 -----------------
        const rowsFavs = await Diet.fetchTop3('uuidU004'); // req.user.id

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

        const rowsDiets = await Diet.findAll('uuidU004', {
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
                calories: []
            }
        });
    }
}

export const getAllFavs = async (req: any, res: any) => {
    try {
        const rowsFavs = await Diet.findAllFavs('uuidU004');

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

        return res.json({
            msg: "",
            data: {
                diets: Object.values(favs)
            }
        });

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

export const getDiet = async (req: any, res: any) => {
    try {
        const rowsDiet = await Diet.findInfo('UUIDU001', 'UUIDD001')

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