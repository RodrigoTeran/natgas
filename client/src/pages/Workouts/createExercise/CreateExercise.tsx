import PopUp from "../../../components/Modals/PopUp/PopUp";
import styles from "./CreateExercise.module.css";
import { MessagesContext } from "../../../layouts/Messages/Messages";
import Photo from "../images/photo.png";
import { uploadImage } from "../../../routes/images/images.routes";
import { Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import { newExercise } from "../../../routes/exercise/exercise.routes";
import placeholder from "../images/placeholder-image.jpg";
import { getClientIdCache } from "../../../cache/auth";

interface Props {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}
function CreateExercise({ isOpen, setIsOpen }: Props) {
	const { addStaticMsg } = useContext(MessagesContext);

	const [name, setName] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [image, setImage] = useState<File[]>([]);
	const [previewImage, setPreviewImage] = useState<string>(placeholder);

	// fotos
	const uploadedPhotos = useRef<string[]>([]);

	const clear = () => {
		setName("");
		setDescription("");
		setImage([]);
	};

	const isValid = (): boolean => {
		if (name.trim() === "" || image.length == 0) { // || description.trim() === "" 
			addStaticMsg("No dejes campos vacios", "danger");
			return false;
		}
		return true;
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
	};

	const uploadImages = async (): Promise<boolean> => {
		const arr = [];
		arr.push(promiseImg(image[0]));

		const res = await Promise.all(arr);

		let valid: boolean = true;
		if (!res[0]) {
			valid = false;
		}

		return valid;
	};

	const onSubmit = () => {
		if (!isValid()) {
			return;
		}

		const doFetch = async (): Promise<void> => {
			const validImages = await uploadImages();
			if (!validImages) {
				addStaticMsg("No se pudieron subir algunas imágenes", "danger");
				return;
			}
			const body: any = {
				name,
				description,
				imageSrc: uploadedPhotos.current[0],
			};

			const resData = await newExercise(body);
			if (resData === null) {
				addStaticMsg("Error al agregar ejercicio", "danger");
				return;
			}

			if (resData.msg !== "") {
				addStaticMsg(resData.msg, "danger");
				return;
			}
			// if (!body.data.upload) {
			// 	addStaticMsg("Error al subir la rutina", "danger");
			// 	return;
			// }
			clear();
			
			addStaticMsg("Se agrego un ejercicio con exito", "success");
			setPreviewImage(placeholder);
			setIsOpen(false);
		};
		doFetch();
	};

	return (
		<PopUp
			callbackClose={() => {
				setName("");
				setDescription("");
				setImage([]);
				setPreviewImage(placeholder);
			}}
			isOpen={isOpen}
			setIsOpen={setIsOpen}
		>
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
								accept="image/png, image/jpeg, image/jpg"
								onChange={(event) => {
									const file = event.target.files?.[0];
									if (file) {
										setPreviewImage(URL.createObjectURL(file));
										setImage([file]);
									} else {
										setPreviewImage(placeholder);
									}
								}}
							/>
							<img className={styles.image} src={previewImage} />
						</label>
						{previewImage !== placeholder && (
							<label className={styles.change_image_button}>
								<input
									className={styles.change_button}
									type="file"
									name="changeImage"
									accept="image/png, image/jpeg, image/jpg"
									onChange={(event) => {
										const file = event.target.files?.[0];
										if (file) {
											setPreviewImage(URL.createObjectURL(file));
											setImage([file]);
										} else {
											setPreviewImage(placeholder);
										}
									}}
								/>
								Change Image
							</label>
						)}
					</div>
				</div>

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
