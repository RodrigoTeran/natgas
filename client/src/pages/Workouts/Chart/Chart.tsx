import { Bar } from 'react-chartjs-2';
import PopUp from "../../../components/Modals/PopUp/PopUp";
import styles from "./Chart.module.css";
import { IWorkout } from "../../../interfaces/Workout.interfaces";
import {
    Dispatch,
    SetStateAction
} from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options: any = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Workouts más vistos',
            color: "#FFF"
        },
    },
    scales: {
        x: {
            ticks: {
                color: '#FFF'
            }
        },
        y: {
            ticks: {
                color: '#FFF'
            }
        }
    }
};

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    workouts: IWorkout[];
}

function Chart({
    isOpen,
    setIsOpen,
    workouts
}: Props) {

    const labels = (): string[] => {
        const lab: string[] = [];
        for (let i = 0; i < workouts.length; i++) {
            lab.push(workouts[i].name);
        }
        return lab;
    };


    const data: any = {
        labels: labels(),
        datasets: [
            {
                label: 'Workouts',
                data: labels().map(() => Math.round(Math.random() * 10) + 1),
                backgroundColor: 'rgba(255, 99, 132, 0.5)'
            }
        ],
    };

    return (
        <PopUp isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className={styles.chart}>
                <h1>
                    Workouts más vistos
                </h1>
                <Bar options={options} data={data} />
            </div>
        </PopUp>
    );
}
export default Chart;
