import Measurement from "../models/Measurement/measurement.model";
import type { IMeasurement } from "../interfaces/Measurement.interface";

export const insertMedidas = async (req, res) => {
    try {
        const { clientId, medidas } = req.body;
        const medidasToInsert: IMeasurement[] = medidas.map(
            (medida: { bodyPart: string; measurement: number }) => {
                return {
                    id: null,
                    clientId,
                    measurement: medida.measurement,
                    createdAt: new Date(),
                    bodyPart: medida.bodyPart,
                    tableName: `measurements_${medida.bodyPart}`,
                };
            }
        );
        for (const medida of medidasToInsert) {
            await Measurement.create(medida);
        }
        return res.json({
            auth: true,
            msg: "Medidas creadas exitosamente",
            data: {
                medidas: medidasToInsert,
            },
        });
    } catch (error) {
        console.log(error);
        return res.json({
            auth: true,
            msg: "Error creando medidas",
            data: {
                medidas: null,
            },
        });
    }
};

