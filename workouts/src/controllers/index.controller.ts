import Workout from "../models/Workouts/workouts.model";

export const getWorkouts = async (req, res) => {
    try {

        const [rowsWorkoutsFav, rowsWorkoutsAll] = await Workout.find(req.user.id);

        return res.json({
            auth: true,
            msg: "",
            data: {
                workoutsFav: rowsWorkoutsFav,
                workoutsAll: rowsWorkoutsAll
            }
        });
    } catch (error) {

        console.log(error);

        return res.json({
            auth: true,
            msg: "",
            data: {
                workouts: []
            }
        });
    }
}