import { DIET_ROUTE } from '../index';
import { IDiet } from '../../interfaces/Diet.interface';

const dietRoute = `${DIET_ROUTE}/diets`;

export interface IGetDietsData {
    diets: IDiet[]
}

//router.get('/', getAll);
export const getAll = async (): Promise<null | IGetDietsData> => {
    try {
        const res = await fetch(dietRoute, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data: any = await res.json();

        if (data === null || data === undefined) {
            return null;
        }

        return data.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

//router.get('/favs', getAllFavs);
//router.get('/info', getDiet);