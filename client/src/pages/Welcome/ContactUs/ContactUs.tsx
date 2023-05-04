import Menu from "../Menu/Menu";
import s from "./ContactUs.module.css";
import emailjs, { EmailJSResponseStatus } from "emailjs-com";
import { useContext, useRef } from "react";
import { MessagesContext } from "../../../layouts/Messages/Messages";

function ContactUs() {
	const formRef = useRef<HTMLFormElement>(null);
	const { addStaticMsg } = useContext(MessagesContext);

	const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		emailjs
			.sendForm(
				"service_o0n6kjj",
				"template_5u6mmgo",
				e.currentTarget,
				"uFMwQXZa9cXQ6egM2"
			)
			.then(
				(result: EmailJSResponseStatus) => {
					console.log(result.text);
				},
				(error: EmailJSResponseStatus) => {
					console.log(error.text);
				}
			);

		addStaticMsg("Se mando el forms con exito!", "success");
		formRef.current?.reset();
	};

	return (
		<div className={s.page}>
			<Menu />
			<div className={s.content}>
				<div className={s.left}>
					<h1 className={s.h1}>Contacto</h1>
					<form className={s.form} onSubmit={sendEmail} ref={formRef}>
						<label className={s.label}>Nombre:</label>
						<input
							className={s.input}
							name="nombre"
							type="text"
							placeholder="Ingresa tu nombre..."
							required
						/>
						<label className={s.label}>Correo:</label>
						<input
							className={s.input}
							name="correo"
							type="email"
							placeholder="Ingresa tu correo..."
							required
						/>
						<label className={s.label}>Mensaje:</label>
						<input
							className={s.textarea}
							name="mensaje"
							type="textarea"
							placeholder="Ingresa tu mensaje..."
							required
						/>
						<button type="submit" className={s.button}>
							Enviar
						</button>
					</form>
				</div>
				<div className={s.right}>
					<img
						className={s.imagen_right}
						src="https://cdni.iconscout.com/illustration/premium/thumb/contact-us-5795988-4849052.png"
					/>
				</div>
			</div>
		</div>
	);
}

export default ContactUs;
