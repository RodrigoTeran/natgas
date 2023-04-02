import { number } from "yargs";
import {IBody} from "../../interfaces/Body.interface";
import Body from "../../models/Progreso/progreso.models";

export const getAll = async (req:any, res: any) => {
    try {
        const measures: {
            [key: string]: IBody
        } = {};

        const body = 
        ['chest', 'height', 'hip', 'leftarm', 'leftcalve', 
        'leftforearm', 'leftleg', 'neck', 'rightarm', 'rightcalve', 
        'rightforearm', 'rightleg', 'waist', 'weight'];

        let max: number = 0;
        
        for(let i = 0; i < body.length; i++){
            const rowsMeasures = await Body.fetchAll(req.user.id, body[i]);
            const measuresList: number[] = [];

            for(let j = 0; j < rowsMeasures.length; j++){
                const m: any = rowsMeasures[j];

                measuresList.push(Number.parseInt(m.measurement));

            }

            if (measuresList.length > max){
                max = measuresList.length;
            }

            measures[body[i]] = {
                measurements: measuresList
            }
        }
        


        return res.json ({
            msg: "",
            data: {
                measures: measures,
                //max: max
            },
            auth: true
        })

    } catch (error) {
        console.log(error);

        return res.json({
            msg: "",
            data: {
                body: [],
                //max: 0
            },
            auth: true
        });
    }
}