import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import {
	getUserGoalData,
	getUserSexData,
} from "../../../routes/auth/auth.routes";
import { MessagesContext } from "../../../layouts/Messages/Messages";
import { useContext, useEffect, useState } from "react";
import styles from "./UserGoal.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

function UserGoal() {
	const { addStaticMsg } = useContext(MessagesContext);
	const [goalData, setGoalData] = useState({
		SubirPeso: 0,
		MantenerPeso: 0,
		BajarPeso: 0,
	});

	const fetchSexData = async (): Promise<void> => {
		const resData = await getUserGoalData();
		console.log(resData);
		if (resData === null) {
			addStaticMsg("Error al obtener las dietas", "danger");
			return;
		}

		setGoalData(resData.data);
	};

	useEffect(() => {
		fetchSexData();
	}, []);

	const chartData = {
		labels: ["Hombres", "Mujeres"],
		datasets: [
			{
				label: "# of users",
				data: [goalData.SubirPeso, goalData.MantenerPeso, goalData.BajarPeso],
				backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
				borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
				borderWidth: 1,
			},
		],
	};

	return (
		<div className={styles.content}>
			<Pie data={chartData} />
		</div>
	);
}
export default UserGoal;
