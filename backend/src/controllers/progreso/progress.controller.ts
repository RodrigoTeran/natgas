import {IBody} from "../../interfaces/Body.interface";
import Body from "../../models/Progreso/progreso.models";

export const getAll = async (req:any, res: any) => {
    try {
        const measures: {
            [key: string]: IBody
        } = {};
        
        const body = req.query;
        let bodyParts: string[] = Object.values(body);

        for(let i = 0; i < bodyParts.length; i++){
            const rowsMeasures = await Body.fetchAll(req.user.id, bodyParts[i]);
            const measuresList: number[] = [];
            const dateList: string[] = [];

            for(let j = 0; j < rowsMeasures.length; j++){
                const m: any = rowsMeasures[j];

                measuresList.push(Number.parseInt(m.measurement));
                dateList.push(m.createdAt);
            }

            measures[bodyParts[i]] = {
                measurements: measuresList,
                dates: dateList,
            }
        }
        
        return res.json ({
            msg: "",
            data: {
                data: measures
            },
            auth: true
        })

    } catch (error) {
        console.log(error);

        return res.json({
            msg: "",
            data: {
                data: []
            },
            auth: true
        });
    }
}