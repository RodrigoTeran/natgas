export interface IMeasurement {
    id: string;
    clientId: string;
    measurement: number;
    createdAt: Date;
    tableName: string;
}

export interface IBody {
    id: string;
    measurement: number;
    date: string;
}