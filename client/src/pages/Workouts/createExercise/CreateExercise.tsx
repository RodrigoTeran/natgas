import PopUp from "../../../components/Modals/PopUp/PopUp";
import styles from "./CreateExercise.module.css";
import { MessagesContext } from "../../../layouts/Messages/Messages";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { newExercise } from "../../../routes/exercise/exercise.routes";
import placeholder from "../images/placeholder-image.jpg";

interface Props {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}
function CreateExercise({ isOpen, setIsOpen }: Props) {
	const { addStaticMsg } = useContext(MessagesContext);

	const [name, setName] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [imageSrc, setImageSrc] = useState<string>("");

	const onSubmit = () => {
		if (name === "" || description === "" || imageSrc === "") {
			addStaticMsg("No dejes campos vacios", "danger");
			return;
		}

		const doFetch = async (): Promise<void> => {
			const body: any = {
				name,
				description,
				imageSrc,
			};
			console.log(body);
			const resData = await newExercise(body);
			console.log(resData);
			if (resData === null) {
				addStaticMsg("Error al agregar ejercicio", "danger");
				return;
			}

			if (resData.msg !== "") {
				addStaticMsg(resData.msg, "danger");
				return;
			}

			setIsOpen(false);
		};
		doFetch();
	};

	return (
		<PopUp isOpen={isOpen} setIsOpen={setIsOpen}>
			<div className={styles.create}>
				<div className={styles.crear_title}>Crear Ejercicio</div>
				<div className={styles.create_nombre}>
					<h3 className={styles.h3_nombre}>Nombre</h3>
					<input
						className={styles.input_nombre}
						type="text"
						name="name"
						placeholder="Inserta Nombre..."
						value={name}
						onChange={(event) => {
							setName(event.target.value);
						}}
					/>
				</div>

				<div className={styles.crear_foto}>
					<h3 className={styles.h3_nombre}>Foto</h3>
					<div className={styles.seccion_foto}>
						<label className={styles.custom_file_upload}>
							<input
								type="file"
								name="imageId"
								value={imageSrc}
								accept="image/*"
								onChange={(event) => {
									setImageSrc(event.target.value);
								}}
							/>
							<img className={styles.image} src={placeholder} />{" "}
						</label>
					</div>
				</div>
				{/* <div className={styles.crear_foto}>
					<h3 className={styles.h3_nombre}>Foto</h3>
					<div className={styles.seccion_foto}>
						<label className={styles.custom_file_upload}>
							<input
								type="text"
								name="imageId"
								value={imageSrc}
								onChange={(event) => {
									setImageSrc(event.target.value);
								}}
							/>
						</label>
					</div>
				</div> */}
				<div className={styles.crear_descripcion}>
					<h3 className={styles.h3_nombre}>Descripcion</h3>
					<textarea
						className={styles.input_textarea_create}
						name="description"
						placeholder="Inserta Nombre..."
						value={description}
						onChange={(event) => {
							setDescription(event.target.value);
						}}
					/>
				</div>
				<input
					className={styles.crear_ejercicio_submit}
					type="submit"
					value="Crear"
					onClick={onSubmit}
				/>
			</div>
		</PopUp>
	);
}

export default CreateExercise;
