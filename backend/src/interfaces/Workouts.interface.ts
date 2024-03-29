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