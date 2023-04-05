import PopUp from "../../../components/Modals/PopUp/PopUp";
import styles from "./CreateExercise.module.css";
import { MessagesContext } from "../../../layouts/Messages/Messages";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { createExercise } from "../../../routes/exercise/exercise.routes";

interface Props {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}
function CreateExercise({ isOpen, setIsOpen }: Props) {
	const { addStaticMsg } = useContext(MessagesContext);

	const [name, setName] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [imageId, setImageId] = useState<string>("");

	const onSubmit = () => {
		const doFetch = async (): Promise<void> => {
			const body: any = {
				name,
				description,
				imageId,
			};
			const resData = await createExercise(body);
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
								value={imageId}
								onChange={(event) => {
									setImageId(event.target.value);
								}}
							/>
							<img
								className={styles.image}
								src="https://talentclick.com/wp-content/uploads/2021/08/placeholder-image.png"
							/>{" "}
						</label>
					</div>
				</div>
				<div className={styles.crear_descripcion}>
					<h3 className={styles.h3_nombre}>Descripcion</h3>
					<textarea
						className={styles.input_textarea_create}
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
