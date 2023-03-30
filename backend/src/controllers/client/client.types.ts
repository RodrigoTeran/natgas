export interface IRegisterBody {
    username: string;
    height: number;
    weight: number;
    dateOfBirth: Date;
    goal: string;
    level: string;
    sex: "F" | "M";
}