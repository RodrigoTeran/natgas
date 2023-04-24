export interface IMeasurement {
    measurements: number[],
    dates: Date[]
}

export interface IMeasurements {
    [key: string]: IMeasurement
}

export interface IDataset {
    label: string,
    data: number[],
    borderColor: string,
    backgroundColor: string
}