export interface IMeasurement {
    id: string;
    clientId: string;
    measurement: number;
    createdAt: Date;
    tableName: string;
}