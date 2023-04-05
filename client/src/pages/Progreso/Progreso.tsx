import React, { Fragment } from "react";
import styles from "./style.module.css";
import Dashboard from "../../layouts/Dashboard/Dashboard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { MessagesContext } from "../../layouts/Messages/Messages";
import { getAll } from "../../routes/progreso/progress.routes";
import { Data } from "./Data/Data";
import type { IMesaurements } from "./Progress.types";

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";


ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

export const Progreso = () => {
	const { addStaticMsg } = useContext(MessagesContext);
	const [measures, setMeasures] = useState<IMesaurements>({});
	const [bodyParts, setBodyParts] = useState<any>(["chest",
													"hip",
													"leftarm",
													"leftcalve",
													"leftforearm",
													"leftleg",
													"neck",
													"rightarm",
													"rightcalve",
													"rightforearm",
													"rightleg",
													"waist",
													"weight"]);
	const [value, setValue] = useState<any>("Agregar...");

	const handleChange = (e: any):void => {
		setValue(e.target.value);
	}

	const navigate = useNavigate();
	/*
	const aux = (e: any) => {
		console.log(typeof e.target.value);
	}*/
	
	const dictionary = new Map<string, string>();
	dictionary.set('chest', 'Pecho');
	dictionary.set('hip', 'Cadera');
	dictionary.set('leftarm', 'Brazo izq');
	dictionary.set('leftcalve', 'Pantorrilla izq');
	dictionary.set('leftforearm', 'Antebrazo izq');
	dictionary.set('leftleg', 'Pierna izq');
	dictionary.set('neck', 'Cuello');
	dictionary.set('rightarm', 'Brazo der');
	dictionary.set('rightcalve', 'Pantorrilla der');
	dictionary.set('rightforearm', 'Antebrazo izq');
	dictionary.set('rightleg', 'Pierna der');
	dictionary.set('waist', 'Cintura');
	dictionary.set('weight', 'Peso');
	/*
		chest: "Pecho",
		hip: "Cadera",
		leftarm: "Brazo izq-",
		leftcalve: "Pantorrilla izq",
		leftforearm: "Antebrazo izq.",
		leftleg: "Pierna izq",
		neck: "Cuello",
		rightarm: "Brazo der",
		rightcalve: "Pantorrilla der",
		rightforearm: "Pantorrilla izq",
		rightleg: "Pierna der",
		waist: "Cintura",
		weight: "Peso",
	*/
	const body = [
		"chest",
		"hip",
		"leftarm",
		"leftcalve",
		"leftforearm",
		"leftleg",
		"neck",
		"rightarm",
		"rightcalve",
		"rightforearm",
		"rightleg",
		"waist",
		"weight",
	];

	const getAllController = (): void => {
		const doFetch = async () => {
			const fetchAll = await getAll(bodyParts);

			if (fetchAll === null) {
				addStaticMsg("Error al obtener el progreso", "danger");
				return;
			}

			if (fetchAll.msg !== "") {
				addStaticMsg(fetchAll.msg, "danger");
				return;
			}
			setMeasures(fetchAll.data.data);

			console.log(bodyParts);
		};

		void doFetch();
	};

	useEffect(() => {
		getAllController();
	}, [bodyParts]);


	return (
		<Dashboard>
			<div className={styles.layout}>
				<div className={styles.update}>
					<button
						onClick={() => {
							navigate("/actualizar-medidas");
						}}
					>
						Actualizar medidas
					</button>
				</div>

				<section className={styles.general_info}>
					<div className={styles.calendar}>
						<div className={styles.calendar_info}>
							<div className={styles.calendar_item}>
								<label htmlFor="inicio">Desde</label>
								<input type="date" name="inicio" id="inicio" />
							</div>

							<div className={styles.calendar_item}>
								<label htmlFor="inicio">Hasta </label>
								<input type="date" name="fin" id="fin" />
							</div>
						</div>

						<h2>Información General</h2>

						<div></div>
					</div>

					<article className={styles.general_info_card}>
						<div className={styles.tags}>
							{bodyParts.map((element: string, key: number) => {
								return(
									<div className={styles[element]} key={key}>
										<p>{dictionary.get(element)}</p>
										<a onClick={(e) =>setBodyParts(bodyParts.filter((bodyPart: string) => bodyPart != element))}>&times;</a>
									</div>
								)
							})}

							{bodyParts.length < 13 && (
								<>
									<div className={styles.add_tag_container}>
									<select className={styles.more} value={value} onChange={(e) => handleChange(e)}>
										<option value="Agregar..." selected hidden>Agregar...</option>
										{body.map((element: string, key: number) => {
											if (bodyParts.indexOf(element) === -1){
												return (<option  value={element} key={key}>{dictionary.get(element)}</option>)
											}
										})}
									</select>
									{value !== "Agregar..." && (
										<button className={styles.add_tag} onClick={(e) => {setBodyParts(bodyParts.concat([value])); setValue("Agregar...")}}>OK</button>
									)}
									</div>
								</>
							)}

						</div>

						<div className={styles.general_graph}>
							<Data data={measures} />
						</div>
					</article>
				</section>

				<section className={styles.detailed}>
					<h2>Vistas Detalladas</h2>
					<div className={styles.detailed_info}>
						<article>
							<div className={styles.aux}>
								<div className={styles.calendar_info}>
									<div className={styles.calendar_item}>
										<label htmlFor="inicio">Desde</label>
										<input type="date" name="inicio" id="inicio" />
									</div>

									<div className={styles.calendar_item}>
										<label htmlFor="inicio">Hasta </label>
										<input type="date" name="fin" id="fin" />
									</div>
								</div>
								{/*<a className={styles.remove} href="">&times;</a>*/}
								<div className={styles.tags}>
									<div className={styles.weight}>
										<p>Peso</p>
										<a href="#">&times;</a>
									</div>
									<div className={styles.chest}>
										<p>Pecho</p>
										<a href="#">&times;</a>
									</div>

									<div className={styles.neck}>
										<p>Cuello</p>
										<a href="#">&times;</a>
									</div>

									<select className={styles.more} name="medida" id="medida">
										<option value="add" disabled selected hidden>
											+
										</option>
										<option value="cintura">Cintura</option>
										<option value="cadera">Cadera</option>
										<option value="cuello">Cuello</option>
										<option value="pierna_izquierda">Pierna izq.</option>
									</select>
								</div>

								<div className={styles.graph}></div>
							</div>
						</article>

						<article>
							<div className={styles.aux}>
								<div className={styles.calendar_info}>
									<div className={styles.calendar_item}>
										<label htmlFor="inicio">Desde</label>
										<input type="date" name="inicio" id="inicio" />
									</div>

									<div className={styles.calendar_item}>
										<label htmlFor="inicio">Hasta </label>
										<input type="date" name="fin" id="fin" />
									</div>
								</div>
								{/*<a className={styles.remove} href="">&times;</a>*/}
								<div className={styles.tags}>
									<div className={styles.weight}>
										<p>Peso</p>
										<a href="#">&times;</a>
									</div>

									<select className={styles.more} name="medida" id="medida">
										<option value="add" disabled selected hidden>
											+
										</option>
										<option value="cintura">Cintura</option>
										<option value="cadera">Cadera</option>
										<option value="cuello">Cuello</option>
										<option value="pierna_izquierda">Pierna izq.</option>
									</select>
								</div>

								<div className={styles.graph}></div>
							</div>
						</article>

						<article>
							<div className={styles.aux}>
								<div className={styles.calendar_info}>
									<div className={styles.calendar_item}>
										<label htmlFor="inicio">Desde</label>
										<input type="date" name="inicio" id="inicio" />
									</div>

									<div className={styles.calendar_item}>
										<label htmlFor="inicio">Hasta </label>
										<input type="date" name="fin" id="fin" />
									</div>
								</div>
								{/*<a className={styles.remove} href="">&times;</a>*/}
								<div className={styles.tags}>
									<div className={styles.weight}>
										<p>Peso</p>
										<a href="#">&times;</a>
									</div>

									<select className={styles.more} name="medida" id="medida">
										<option value="add" disabled selected hidden>
											+
										</option>
										<option value="cintura">Cintura</option>
										<option value="cadera">Cadera</option>
										<option value="cuello">Cuello</option>
										<option value="pierna_izquierda">Pierna izq.</option>
									</select>
								</div>

								<div className={styles.graph}></div>
							</div>
						</article>

						<article>
							<div className={styles.aux}>
								<div className={styles.calendar_info}>
									<div className={styles.calendar_item}>
										<label htmlFor="inicio">Desde</label>
										<input type="date" name="inicio" id="inicio" />
									</div>

									<div className={styles.calendar_item}>
										<label htmlFor="inicio">Hasta </label>
										<input type="date" name="fin" id="fin" />
									</div>
								</div>
								{/*<a className={styles.remove} href="">&times;</a>*/}
								<div className={styles.tags}>
									<div className={styles.weight}>
										<p>Peso</p>
										<a href="#">&times;</a>
									</div>

									<select className={styles.more} name="medida" id="medida">
										<option value="add" disabled selected hidden>
											+
										</option>
										<option value="cintura">Cintura</option>
										<option value="cadera">Cadera</option>
										<option value="cuello">Cuello</option>
										<option value="pierna_izquierda">Pierna izq.</option>
									</select>
								</div>

								<div className={styles.graph}></div>
							</div>
						</article>

						{/*<div className={styles.add}>
                        <button>+</button>
                    </div>*/}
					</div>
				</section>
			</div>
		</Dashboard>
	);
};
