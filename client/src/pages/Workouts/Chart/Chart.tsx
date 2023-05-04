import { Bar } from 'react-chartjs-2';
import PopUp from "../../../components/Modals/PopUp/PopUp";
import styles from "./Chart.module.css";
import { IWorkoutMetrics } from "../../../interfaces/Workout.interfaces";
import { getMetrics } from "../../../routes/workouts/workouts.routes";
import {
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
    useContext
} from "react";
import { MessagesContext } from "../../../layouts/Messages/Messages";

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
            text: 'Workouts con más likes',
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
}

function Chart({
    isOpen,
    setIsOpen
}: Props) {
    const { addStaticMsg } = useContext(MessagesContext);
    const [metrics, setMetrics] = useState<IWorkoutMetrics[]>([]);

    const getAll = (): void => {
        const doFetch = async (): Promise<void> => {
            const data = await getMetrics();

            if (data === null) {
                addStaticMsg("Error al obtener las métricas", "danger");
                return;
            }
            if (data.msg !== "") {
                addStaticMsg(data.msg, "danger");
                return;
            }

            setMetrics(data.data.workouts);
        };
        void doFetch();
    };

    useEffect(() => {
        getAll();
    }, []);

    const labels = (): string[] => {
        const lab: string[] = [];
        for (let i = 0; i < metrics.length; i++) {
            lab.push(metrics[i].name);
        }
        return lab;
    };

    const _data = (): number[] => {
        const lab: number[] = [];
        for (let i = 0; i < metrics.length; i++) {
            lab.push(metrics[i].amount);
        }
        return lab;
    };


    const data: any = {
        labels: labels(),
        datasets: [
            {
                label: 'Workouts',
                data: _data(),
                backgroundColor: 'rgba(255, 99, 132, 0.5)'
            }
        ],
    };

    return (
        <PopUp isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className={styles.chart}>
                <h1>
                    Workouts con más likes
                </h1>
                <Bar options={options} data={data} />
            </div>
        </PopUp>
    );
}
export default Chart;
