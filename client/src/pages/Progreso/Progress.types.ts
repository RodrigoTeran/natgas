export interface IMesaurement {
    measurements: number[],
    dates: Date[]
}

export interface IMesaurements {
    [key: string]: IMesaurement
}

export interface IDataset {
    label: string,
    data: number[],
    borderColor: string,
    backgroundColor: string
}