import React, { Fragment } from "react";
import styles from "./style.module.css";
import Dashboard from "../../layouts/Dashboard/Dashboard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { MessagesContext } from "../../layouts/Messages/Messages";
import { getAll } from "../../routes/progreso/progress.routes";
import { Data } from "./Data/Data";
import type { IMeasurements } from "./Progress.types";

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	elements,
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
	const [measures, setMeasures] = useState<IMeasurements>({});
	const [bodyParts, setBodyParts] = useState<any>([]);

	const [value, setValue] = useState<any>("Agregar...");
	const [start, setStart] = useState<any>('0000-01-01 00:00:00');
	const [end, setEnd] = useState<any>('9999-12-31 23:59:59');

	// Detailed 1
	const [garyMeasurements, setGaryMeasurements] = useState<IMeasurements>({});
	const [garyBody, setGaryBody] = useState<any>([]);
	const [garyValue, setGaryValue] = useState<any>("Agregar...");
	const [garyStart, setGaryStart] = useState<any>('0000-01-01 00:00:00');
	const [garyEnd, setGaryEnd] = useState<any>('9999-12-31 23:59:59');

	// Detailed 2
	const [patricioMeasurements, setPatricioMeasurements] = useState<IMeasurements>({});
	const [patricioBody, setPatricioBody] = useState<any>([]);
	const [patricioValue, setPatricioValue] = useState<any>("Agregar...");
	const [patricioStart, setPatricioStart] = useState<any>('0000-01-01 00:00:00');
	const [patricioEnd, setPatricioEnd] = useState<any>('9999-12-31 23:59:59');

	// Detailed 3
	const [calamardoMeasurements, setCalamardoMeasurements] = useState<IMeasurements>({});
	const [calamardoBody, setCalamardoBody] = useState<any>([]);
	const [calamardoValue, setCalamardoValue] = useState<any>("Agregar...");
	const [calamardoStart, setCalamardoStart] = useState<any>('0000-01-01 00:00:00');
	const [calamardoEnd, setCalamardoEnd] = useState<any>('9999-12-31 23:59:59');

	// Detailed 4
	const [esponjaMeasurements, setEsponjaMeasurements] = useState<IMeasurements>({});
	const [esponjaBody, setEsponjaBody] = useState<any>([]);
	const [esponjaValue, setEsponjaValue] = useState<any>("Agregar...");
	const [esponjaStart, setEsponjaStart] = useState<any>('0000-01-01 00:00:00');
	const [esponjaEnd, setEsponjaEnd] = useState<any>('9999-12-31 23:59:59');

	const handleChange = (e: any, pointer: number):void => {
		if (pointer === 0) setValue(e.target.value);
		if (pointer === 1) setGaryValue(e.target.value);
		if (pointer === 2) setPatricioValue(e.target.value);
		if (pointer === 3) setCalamardoValue(e.target.value);
		if (pointer === 4) setEsponjaValue(e.target.value);
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
			const fetchAll = await getAll(bodyParts, start, end);
			const garyFetchAll = await getAll(garyBody, garyStart, garyEnd);
			const patricioFetchAll = await getAll(patricioBody, patricioStart, patricioEnd);
			const calamardoFetchAll = await getAll(calamardoBody, calamardoStart, calamardoEnd);
			const esponjaFetchAll = await getAll(esponjaBody, esponjaStart, esponjaEnd);

			if (fetchAll === null || garyFetchAll === null || patricioFetchAll === null || calamardoFetchAll === null || esponjaFetchAll === null) {
				addStaticMsg("Error al obtener el progreso", "danger");
				return;
			}

			if (fetchAll.msg !== "" || garyFetchAll.msg !== "" || patricioFetchAll.msg !== "" || calamardoFetchAll.msg !== "" || esponjaFetchAll.msg !== "") {
				addStaticMsg(fetchAll.msg, "danger");
				return;
			}

			setMeasures(fetchAll.data.data);
			setGaryMeasurements(garyFetchAll.data.data);
			setPatricioMeasurements(patricioFetchAll.data.data);
			setCalamardoMeasurements(calamardoFetchAll.data.data);
			setEsponjaMeasurements(esponjaFetchAll.data.data);

		};

		void doFetch();
	};

	useEffect(() => {
		getAllController();
	}, [bodyParts, start, end,
		garyBody, garyStart, garyEnd,
		calamardoBody, calamardoStart, calamardoEnd,
		patricioBody, patricioStart, patricioEnd,
		esponjaBody, esponjaStart, esponjaEnd,
	]);


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
								<input type="date" name="inicio" id="inicio" onChange={(e) => setStart(e.target.value)}/>
							</div>

							<div className={styles.calendar_item}>
								<label htmlFor="inicio">Hasta </label>
								<input type="date" name="fin" id="fin" onChange={(e) => setEnd(e.target.value)} />
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
									<select className={styles.more} value={value} onChange={(e) => handleChange(e, 0)}>
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
										<input type="date" name="inicio" id="inicio" onChange={(e) => setGaryStart(e.target.value)}/>
									</div>

									<div className={styles.calendar_item}>
										<label htmlFor="inicio">Hasta </label>
										<input type="date" name="fin" id="fin" onChange={(e) => setGaryEnd(e.target.value)}/>
									</div>
								</div>
								
								<div className={styles.tags}>
									{garyBody.map((element: string, key: number) => {
										return(
											<div className={styles[element]} key={key}>
												<p>{dictionary.get(element)}</p>
												<a onClick={(e) =>setGaryBody(garyBody.filter((bodyPart: string) => bodyPart != element))}>&times;</a>
											</div>
										)
									})}
									{garyBody.length < 4 && (
										<>
											<div className={styles.add_tag_container}>
												<select className={styles.more} value={garyValue} onChange={(e) => handleChange(e, 1)}>
													<option value="Agregar..." selected hidden>Agregar...</option>
													{body.map((element: string, key: number) => {
														if (garyBody.indexOf(element) === -1){
															return (<option value={element} key={key}>{dictionary.get(element)}</option>)
														}
													})}
												</select>
											{garyValue !== "Agregar..." && (
												<button className={styles.add_tag} onClick={(e) => {setGaryBody(garyBody.concat([garyValue])); setGaryValue("Agregar...")}}>OK</button>
											)}
											</div>
										</>
									)}
									
								</div>

								<div className={styles.graph}>
									<Data data={garyMeasurements}></Data>
								</div>
							</div>
						</article>

						<article>
							<div className={styles.aux}>
								<div className={styles.calendar_info}>
									<div className={styles.calendar_item}>
										<label htmlFor="inicio">Desde</label>
										<input type="date" name="inicio" id="inicio" onChange={(e) => setPatricioStart(e.target.value)}/>
									</div>

									<div className={styles.calendar_item}>
										<label htmlFor="inicio">Hasta </label>
										<input type="date" name="fin" id="fin" onChange={(e) => setPatricioEnd(e.target.value)}/>
									</div>
								</div>
								
								<div className={styles.tags}>
									{patricioBody.map((element: string, key: number) => {
										return(
											<div className={styles[element]} key={key}>
												<p>{dictionary.get(element)}</p>
												<a onClick={(e) =>setPatricioBody(patricioBody.filter((bodyPart: string) => bodyPart != element))}>&times;</a>
											</div>
										)
									})}
									{patricioBody.length < 4 && (
										<>
											<div className={styles.add_tag_container}>
												<select className={styles.more} value={patricioValue} onChange={(e) => handleChange(e, 2)}>
													<option value="Agregar..." selected hidden>Agregar...</option>
													{body.map((element: string, key: number) => {
														if (patricioBody.indexOf(element) === -1){
															return (<option value={element} key={key}>{dictionary.get(element)}</option>)
														}
													})}
												</select>
											{patricioValue !== "Agregar..." && (
												<button className={styles.add_tag} onClick={(e) => {setPatricioBody(patricioBody.concat([patricioValue])); setPatricioValue("Agregar...")}}>OK</button>
											)}
											</div>
										</>
									)}
									
								</div>

								<div className={styles.graph}>
									<Data data={patricioMeasurements}></Data>
								</div>
							</div>
						</article>

						<article>
							<div className={styles.aux}>
								<div className={styles.calendar_info}>
									<div className={styles.calendar_item}>
										<label htmlFor="inicio">Desde</label>
										<input type="date" name="inicio" id="inicio" onChange={(e) => setCalamardoStart(e.target.value)}/>
									</div>

									<div className={styles.calendar_item}>
										<label htmlFor="inicio">Hasta </label>
										<input type="date" name="fin" id="fin" onChange={(e) => setCalamardoEnd(e.target.value)}/>
									</div>
								</div>
								
								<div className={styles.tags}>
									{calamardoBody.map((element: string, key: number) => {
										return(
											<div className={styles[element]} key={key}>
												<p>{dictionary.get(element)}</p>
												<a onClick={(e) =>setGaryBody(calamardoBody.filter((bodyPart: string) => bodyPart != element))}>&times;</a>
											</div>
										)
									})}
									{calamardoBody.length < 4 && (
										<>
											<div className={styles.add_tag_container}>
												<select className={styles.more} value={calamardoValue} onChange={(e) => handleChange(e, 3)}>
													<option value="Agregar..." selected hidden>Agregar...</option>
													{body.map((element: string, key: number) => {
														if (calamardoBody.indexOf(element) === -1){
															return (<option value={element} key={key}>{dictionary.get(element)}</option>)
														}
													})}
												</select>
											{calamardoValue !== "Agregar..." && (
												<button className={styles.add_tag} onClick={(e) => {setCalamardoBody(calamardoBody.concat([calamardoValue])); setCalamardoValue("Agregar...")}}>OK</button>
											)}
											</div>
										</>
									)}
									
								</div>

								<div className={styles.graph}>
									<Data data={calamardoMeasurements}></Data>
								</div>
							</div>
						</article>

						<article>
							<div className={styles.aux}>
								<div className={styles.calendar_info}>
									<div className={styles.calendar_item}>
										<label htmlFor="inicio">Desde</label>
										<input type="date" name="inicio" id="inicio" onChange={(e) => setEsponjaStart(e.target.value)}/>
									</div>

									<div className={styles.calendar_item}>
										<label htmlFor="inicio">Hasta </label>
										<input type="date" name="fin" id="fin" onChange={(e) => setEsponjaEnd(e.target.value)}/>
									</div>
								</div>
								
								<div className={styles.tags}>
									{esponjaBody.map((element: string, key: number) => {
										return(
											<div className={styles[element]} key={key}>
												<p>{dictionary.get(element)}</p>
												<a onClick={(e) =>setEsponjaBody(esponjaBody.filter((bodyPart: string) => bodyPart != element))}>&times;</a>
											</div>
										)
									})}
									{esponjaBody.length < 4 && (
										<>
											<div className={styles.add_tag_container}>
												<select className={styles.more} value={esponjaValue} onChange={(e) => handleChange(e, 4)}>
													<option value="Agregar..." selected hidden>Agregar...</option>
													{body.map((element: string, key: number) => {
														if (esponjaBody.indexOf(element) === -1){
															return (<option value={element} key={key}>{dictionary.get(element)}</option>)
														}
													})}
												</select>
											{esponjaValue !== "Agregar..." && (
												<button className={styles.add_tag} onClick={(e) => {setEsponjaBody(esponjaBody.concat([esponjaValue])); setEsponjaValue("Agregar...")}}>OK</button>
											)}
											</div>
										</>
									)}
									
								</div>

								<div className={styles.graph}>
									<Data data={esponjaMeasurements}></Data>
								</div>
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
