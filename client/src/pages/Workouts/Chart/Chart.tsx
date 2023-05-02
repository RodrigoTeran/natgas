import { Bar } from 'react-chartjs-2';
import PopUp from "../../../components/Modals/PopUp/PopUp";
import styles from "./Chart.module.css";
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

const labels = [
    '5-3-1 Jim Wendler',
    'PPL',
    '5x5',
    'Prueba fisica',
    'Tabata',
    'HIIT',
    'Full body',
    'GAP',
    'Aeróbicos',
    'Entrenamiento funcional'
];

export const data = {
    labels,
    datasets: [
        {
            label: 'Workouts',
            data: labels.map(() => Math.round(Math.random() * 1000)),
            backgroundColor: 'rgba(255, 99, 132, 0.5)'
        }
    ],
};


interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function Chart({
    isOpen,
    setIsOpen
}: Props) {
    const clear = (): void => {

    };

    return (
        <PopUp isOpen={isOpen} setIsOpen={setIsOpen} callbackClose={clear}>
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
