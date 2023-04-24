import { DIET_ROUTE } from '../index';
import { IDiet } from '../../interfaces/Diet.interface';
import { IData } from '../routes.types';
import { getClientIdCache } from '../../cache/auth'

const dietRoute = `${DIET_ROUTE}`;
export interface IGetDietsData {
    diets: IDiet[]
}

// Messages complete
//router.get('/', getAll);
export const getAll = async (calories: string, ingredient: string): Promise<null | IData<any>> => {
    try {
        const token = getClientIdCache();

        if (token === null) return null;

        const res = await fetch(`${dietRoute}?calories=${calories}&ingredient=${ingredient}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });
        const data: any = await res.json();

        if (data === null || data === undefined) {
            return null;
        }

        // return data.data;
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Messages complete
//router.get('/favs', getAllFavs);
export const getAllFavs = async (calories: string, ingredient: string): Promise<null | IData<any>> => {
    try {
        const token = getClientIdCache();

        if (token === null) return null;

        const res = await fetch(`${dietRoute}/favs?calories=${calories}&ingredient=${ingredient}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });
        const data: any = await res.json();

        if (data === null || data === undefined) {
            return null;
        }

        // return data.data;
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// TODO: messages
//router.get('/info', getDiet);
export const getDiet = async (dietId: any): Promise<null | IData<any>> => {
    try {
        const token = getClientIdCache();

        if (token === null) return null;

        if(dietId === ""){
            return null;
        }

        const res = await fetch(`${dietRoute}/info?dietId=${dietId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
        });
        const data: any = await res.json();

        if (data === null || data === undefined) {
            return null;
        }
        
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

//router.get('/status', isAuth, setDietStatus);
export const setDietStatus = async (status: boolean, dietId: string): Promise<null> => {
    try {
        const token = getClientIdCache();

        if (token === null) return null;

        const res = await fetch(`${dietRoute}/status?status=${status}&dietId=${dietId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}   

//router.post('/', postDiet);
export const postDiet = async(name:string, calories:string, ingredients: any[], macros:{}, micros:{}): Promise<null | IData<any>> => {
    try {
        const token = getClientIdCache();

        if (token === null) return null;

        const res = await fetch(`${dietRoute}`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({name: name,
                                  calories: calories,
                                  ingredients: ingredients,
                                  macros: macros,
                                  micros: micros}),
        });
 
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const updateDiet = async(id:string, name:string, calories:string, ingredients: any[], macros:{}, micros:{}): Promise<null | IData<any>> => {
    try {
        const token = getClientIdCache();

        if (token === null) return null;

        const res = await fetch(`${dietRoute}/edit`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({
                                  id: id,
                                  name: name,
                                  calories: calories,
                                  ingredients: ingredients,
                                  macros: macros,
                                  micros: micros}),
        });
 
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// router.get('/delete', createService("Eliminar dieta"), deleteDiet);
export const deleteDiet = async (dietId: any): Promise<null | IData<any>> => {
    try {
        const token = getClientIdCache();

        if (token === null) return null;

        if(dietId === ""){
            return null;
        }

        const res = await fetch(`${dietRoute}/delete?dietId=${dietId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
        });
        const data: any = await res.json();

        if (data === null || data === undefined) {
            return null;
        }
        
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}