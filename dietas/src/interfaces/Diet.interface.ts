export interface IDiet {
    id: string;
    name: string;
    calories: number;
    macros: JSON;
    micros: JSON;
    ingredients: string[];
    liked: boolean;
}