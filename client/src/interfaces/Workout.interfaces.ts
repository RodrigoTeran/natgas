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

export interface IExerciseWorkout {
    id: string;
    name: string;
    description: string;
    src: string;
}

export interface ICompleteWorkout {
    id: string;
    name: string;
    description: string;
    frequency: number;
    workoutLevelName: string;
    typeName: string;
    exercises: IExerciseWorkout[];
    src: string;
}