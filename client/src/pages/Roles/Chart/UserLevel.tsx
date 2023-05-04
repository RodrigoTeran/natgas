import { useContext, useEffect, useState } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar, PolarArea } from "react-chartjs-2";
import styles from "./UserGoal.module.css";
import { getUserLevelData } from "../../../routes/auth/auth.routes";
import { MessagesContext } from "../../../layouts/Messages/Messages";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export function UserLevel() {
	const { addStaticMsg } = useContext(MessagesContext);
	const [levelUser, setLevelUser] = useState({
		Total_Sedentarios: 0,
		Total_2_veces_por_semana: 0,
		Caminata_diaria: 0,
		_4_5_días_de_gym: 0,
		Alto_rendimiento: 0,
	});

	const fetchUserLevel = async (): Promise<void> => {
		const resData = await getUserLevelData();
		if (resData === null) {
			addStaticMsg("Error al obtener las dietas", "danger");
			return;
		}

		setLevelUser(resData.data);
	};

	useEffect(() => {
		fetchUserLevel();
	}, []);

	const labels = [
		"Sendentarios",
		"2 veces por semana",
		"Caminata diaria",
		"4-5 días de gym",
		"Altp rendimiento",
	];

	const options = {
		responsive: true,
		plugins: {
		},
	};

	const data = {
		labels,
		datasets: [
			{
				label: "Users",
				data: [
					levelUser.Total_Sedentarios,
					levelUser.Total_2_veces_por_semana,
					levelUser.Caminata_diaria,
					levelUser._4_5_días_de_gym,
					levelUser.Alto_rendimiento,
				],
				backgroundColor: "rgba(255, 99, 132)",
			},
		],
	};

	return (
		<div className={styles.content}>
			<h1>User level</h1>
			<Bar options={options} data={data} />
		</div>
	);
}

export default UserLevel;
