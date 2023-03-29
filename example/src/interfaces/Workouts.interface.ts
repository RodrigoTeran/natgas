// Este es un ejemplo de como definimos las interfaces

export interface IWorkout {
    id: string;
    name: string;
    description: string;
    frequency: number;
    workoutLevelName: string;
    typeName: string;
    exercises: string[];
    liked: boolean;
}