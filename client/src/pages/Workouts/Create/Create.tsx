import PopUp from "../../../components/Modals/PopUp/PopUp";
import styles from "./Create.module.css";
import Photo from "../images/photo.png";
import { Dispatch, SetStateAction, useEffect, useRef, useState, useContext } from "react";
import { MessagesContext } from "../../../layouts/Messages/Messages";
import { uploadImage } from "../../../routes/images/images.routes";
import { createWorkoutRoute } from "../../../routes/workouts/workouts.routes";
import { getAll } from "../../../routes/exercise/exercise.routes";
import Dropdown from "../../../components/Dropdown/Dropdown";

interface Props {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	getAllWorkoutsController: () => void
}

type FREQ = "1" | "2" | "3" | "4" | "5" | "6";
type LEVEL = "Principiante" | "Intermedio" | "Avanzado";
type TYPES = "Fuerza" | "Hipertrofia" | "Híbrido";
interface IExercise {
	description: string;
	id: string;
	imageId: string;
	name: string;
	src: string;
}

function CreateWorkout({ isOpen, setIsOpen, getAllWorkoutsController }: Props) {
	const { addStaticMsg } = useContext(MessagesContext);

	const [name, setName] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [freq, setFreq] = useState<FREQ | null>(null);
	const [isFreqOpen, setIsFreqOpen] = useState<boolean>(false);

	const [level, setLevel] = useState<LEVEL | null>(null);
	const [isLevelOpen, setIsLevelOpen] = useState<boolean>(false);

	const [typeE, setTypeE] = useState<TYPES | null>(null);
	const [isTypeEOpen, setIsTypeEOpen] = useState<boolean>(false);

	const [photos, setPhotos] = useState<File[]>([]);
	const uploadedPhotos = useRef<string[]>([]);

	const [allExercises, setAllExercises] = useState<IExercise[]>([]);
	const [selectedExercises, setSelectedExercises] = useState<IExercise[]>([]);
	const [isExercisesOpen, setIsExercisesOpen] = useState<boolean>(false);

	const getAllController = (): void => {
		const doFetch = async (): Promise<void> => {
			const res = await getAll("");
			const data = res?.data.data;
			setAllExercises(data);
		};
		void doFetch();
	};

	const fetchController = useRef<boolean>(false);
	useEffect(() => {
		if (fetchController.current) return;
		fetchController.current = true;
		getAllController();
	}, [fetchController.current]);

	const isExerciseSelected = (e: IExercise): boolean => {
		for (let i = 0; i < selectedExercises.length; i++) {
			if (e.id === selectedExercises[i].id) return true;
		}
		return false;
	}

	const clear = (): void => {
		// Clear
		setName("");
		setDescription("");
		setFreq(null);
		setIsFreqOpen(false);
		setLevel(null);
		setIsLevelOpen(false);
		setTypeE(null);
		setIsTypeEOpen(false);
		setPhotos([]);
		setAllExercises([]);
		setSelectedExercises([]);
		fetchController.current = false;
	};

	const checkIsValid = (): boolean => {
		let valid: boolean = true;

		if (name.trim() === "") {
			valid = true;
			addStaticMsg("El nombre debe de ser válido", "danger");
		}
		if (description.trim() === "") {
			valid = true;
			addStaticMsg("La descripción debe de ser válida", "danger");
		}
		if (freq === null) {
			valid = true;
			addStaticMsg("Debes de escoger una frecuencia", "danger");
		}
		if (level === null) {
			valid = true;
			addStaticMsg("Debes de escoger un nivel", "danger");
		}
		if (typeE === null) {
			valid = true;
			addStaticMsg("Debes de escoger un tipo de entrenamiento", "danger");
		}
		if (photos.length === 0) {
			valid = true;
			addStaticMsg("Debes de al menos subir una imagen", "danger");
		}

		return valid;
	};

	const promiseImg = (fileImg: File) => {
		return new Promise<boolean>((resolve) => {
			const doFetch = async (): Promise<void> => {
				const resData = await uploadImage(fileImg);

				if (resData === null) {
					addStaticMsg("Error al subir imagen", "danger");
					resolve(false);
					return;
				}

				uploadedPhotos.current = [...uploadedPhotos.current, resData];

				resolve(true);
			};
			doFetch();
		});
	}

	const uploadImages = async (): Promise<boolean> => {
		const arr = [];
		for (let i = 0; i < photos.length; i++) {
			arr.push(promiseImg(photos[i]));
		}
		const res = await Promise.all(arr);

		let valid: boolean = true;
		for (let i = 0; i < res.length; i++) {
			if (!res[i]) {
				valid = false;
			}
		}

		return valid;
	};

	const onSubmit = (): void => {
		if (!checkIsValid()) return;
		const doFetch = async () => {
			const validImages = await uploadImages();
			if (!validImages) {
				addStaticMsg("No se pudieron subir algunas imágenes", "danger");
				return;
			};

			const exercisesId = [];
			for (let i = 0; i < selectedExercises.length; i++) {
				exercisesId.push(selectedExercises[i].id);
			}

			const res = await createWorkoutRoute({
				name,
				description,
				frequency: freq === null ? "" : freq,
				level: level === null ? "" : level,
				typeWorkout: typeE === null ? "" : typeE,
				photosURL: uploadedPhotos.current,
				exercisesId
			});
			if (res === null) return;
			if (res.msg) {
				addStaticMsg(res.msg, "danger");
				return;
			}
			if (!res.data.upload) {
				addStaticMsg("Error al subir la rutina", "danger");
				return;
			}
			addStaticMsg("Rutina creada con éxito", "danger");
			setIsOpen(false);
			getAllWorkoutsController();
			clear();
		};
		void doFetch();
	};

	return (
		<PopUp isOpen={isOpen} setIsOpen={setIsOpen} callbackClose={clear}>
			<div className={styles.create}>
				<div className={styles.create_title}>Crear Workout</div>
				<div className={styles.blocks}>
					<div className={styles.block}>
						<div className={styles.block_title}>
							Nombre
						</div>
						<input
							type="text"
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
							placeholder="Inserta Nombre..."
						/>
					</div>
					<div className={styles.block}>
						<div className={styles.block_title}>
							Características
						</div>
						<div className={styles.block_characteristics}>
							<div className={styles.block_characteristic}>
								<div className={styles.block_characteristic_title}>
									Frecuencia
								</div>
								<Dropdown
									text={freq === null ? "Frecuencia" : freq}
									isOpen={isFreqOpen}
									setIsOpen={setIsFreqOpen}
									classDivChild={styles.block_characteristic_dropdwn_child}
									classBtn={styles.block_characteristic_dropdwn_btn}
								>
									{[
										"1",
										"2",
										"3",
										"4",
										"5",
										"6",
									].map((el: string) => {
										return (
											<div
												key={el}
												onClick={() => {
													setFreq(el as any);
													setIsFreqOpen(false);
												}}
												className={`${el === freq && styles.active
													}`}
											>
												{el}
											</div>
										);
									})}
								</Dropdown>
							</div>
							<div className={styles.block_characteristic}>
								<div className={styles.block_characteristic_title}>
									Nivel
								</div>
								<Dropdown
									text={level === null ? "Nivel" : level}
									isOpen={isLevelOpen}
									setIsOpen={setIsLevelOpen}
									classDivChild={styles.block_characteristic_dropdwn_child}
									classBtn={styles.block_characteristic_dropdwn_btn}
								>
									{[
										"Principiante",
										"Intermedio",
										"Avanzado"
									].map((el: string) => {
										return (
											<div
												key={el}
												onClick={() => {
													setLevel(el as any);
													setIsLevelOpen(false);
												}}
												className={`${el === freq && styles.active
													}`}
											>
												{el}
											</div>
										);
									})}
								</Dropdown>
							</div>
							<div className={styles.block_characteristic}>
								<div className={styles.block_characteristic_title}>
									Tipo
								</div>
								<Dropdown
									text={typeE === null ? "Tipo" : typeE}
									isOpen={isTypeEOpen}
									setIsOpen={setIsTypeEOpen}
									classDivChild={styles.block_characteristic_dropdwn_child}
									classBtn={styles.block_characteristic_dropdwn_btn}
								>
									{[
										"Fuerza",
										"Hipertrofia",
										"Híbrido"
									].map((el: string) => {
										return (
											<div
												key={el}
												onClick={() => {
													setTypeE(el as any);
													setIsTypeEOpen(false);
												}}
												className={`${el === freq && styles.active
													}`}
											>
												{el}
											</div>
										);
									})}
								</Dropdown>
							</div>
						</div>
					</div>
					<div className={styles.block}>
						<div className={styles.block_title}>
							Fotos
						</div>
						<div className={styles.block_photos}>
							{photos.slice(0, 4).map((photo: File, index: number) => {
								const src = URL.createObjectURL(photo);
								return (
									<div className={styles.block_photo} key={index}>
										<button onClick={() => {
											setPhotos(prev => [
												...prev.slice(0, index),
												...prev.slice(index + 1, prev.length)
											]);
										}} className={styles.block_photo_delete}>
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
												<path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
											</svg>
										</button>
										<img src={src} alt="Imagen" />
									</div>
								)
							})}
							{photos.length < 4 && (
								<div>
									<label
										htmlFor="add-photo-workout-input"
										className={`${styles.block_photo} ${styles.block_photo_add}`}>
										<img src={Photo} alt="Añadir" />
										<div>
											Agregar
										</div>
									</label>
									<input onChange={(e) => {
										if (photos.length === 4) return;
										const files = e.target.files;
										if (files === null) return;
										if (files.length === 0) return;
										const file = files[0];
										setPhotos(prev => [...prev, file]);
									}} accept="image/png, image/jpeg, image/jpg" className={styles.input_file} type="file" id="add-photo-workout-input" />
								</div>
							)}
						</div>
					</div>
					<div className={styles.block}>
						<div className={styles.block_title}>
							Descripción
						</div>
						<textarea
							cols={30}
							rows={10}
							value={description}
							onChange={(e) => {
								setDescription(e.target.value);
							}}
							placeholder="Inserta Descripción..."

						></textarea>
					</div>
					<div className={styles.block}>
						<div className={styles.block_title}>
							Ejercicios
						</div>
						<div className={styles.block_execs}>
							{selectedExercises.map((exec: IExercise, index: number) => {
								return (
									<div className={styles.block_exec} key={index}>
										{exec.name}
										<button onClick={() => {
											setSelectedExercises(prev => [
												...prev.slice(0, index),
												...prev.slice(index + 1, prev.length)
											]);
										}} className={styles.block_exec_delete}>
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
												<path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
											</svg>
										</button>
									</div>
								)
							})}
							{allExercises.length > selectedExercises.length && (
								<div className={styles.block_exec_drop}>
									<Dropdown
										text={"Ejercicios"}
										isOpen={isExercisesOpen}
										setIsOpen={setIsExercisesOpen}
										classDivChild={`${styles.block_characteristic_dropdwn_child} ${styles.controll_dropdwn}`}
										classBtn={styles.block_characteristic_dropdwn_btn}
									>
										{allExercises.map((el: IExercise, index: number) => {
											if (isExerciseSelected(el)) return;

											return (
												<div
													key={index}
													onClick={() => {
														setSelectedExercises(prev => [...prev, el]);
														setIsExercisesOpen(false);
													}}
												>
													{el.name}
												</div>
											);
										})}
									</Dropdown>
								</div>
							)}
						</div>
					</div>
					<div className={styles.create_block}>
						<button className={styles.btn_create} onClick={onSubmit}>
							Crear
						</button>
					</div>
				</div>
			</div>
		</PopUp>
	);
}

export default CreateWorkout;
