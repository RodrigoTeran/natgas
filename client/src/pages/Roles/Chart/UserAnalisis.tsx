import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { getUserSexData } from "../../../routes/auth/auth.routes";
import { MessagesContext } from "../../../layouts/Messages/Messages";
import { useContext, useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

function UserAnalisis() {
	const { addStaticMsg } = useContext(MessagesContext);
	const [sexData, setSexData] = useState({
		totalMasculinos: 0,
		totalFemeninos: 0,
	});

	const fetchSexData = async (): Promise<void> => {
		const resData = await getUserSexData();
		if (resData === null) {
			addStaticMsg("Error al obtener las dietas", "danger");
			return;
		}

		if (resData.msg !== "") {
			addStaticMsg(resData.msg, "danger");
			return;
		}

		setSexData(resData.data);
	};

	useEffect(() => {
		fetchSexData();
	}, []);

	const chartData = {
		labels: ["Hombres", "Mujeres"],
		datasets: [
			{
				label: "# of users",
				data: [sexData.totalMasculinos, sexData.totalFemeninos],
				backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
				borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
				borderWidth: 1,
			},
		],
	};

	return <Pie data={chartData} />;
}
export default UserAnalisis;
