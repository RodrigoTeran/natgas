import Menu from "../Menu/Menu";
import s from "./ContactUs.module.css";

function ContactUs() {
	return (
		<div className={s.page}>
			<Menu />
			<div className={s.content}>
				<div className={s.left}>
					<h1 className={s.h1}>Contáctanos</h1>
					<p className={s.p}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed vitae
						quidem ipsa velit tenetur. Rerum id itaque fuga odio dicta maiores
						beatae, sint fugit? Rerum, praesentium quisquam!
					</p>
					<form className={s.form}>
						<label className={s.label}>Nombre:</label>
						<input
							className={s.input}
							name="nombre"
							type="text"
							placeholder="Ingresa tu nombre..."
							required
						></input>
						<label className={s.label}>Correo:</label>
						<input
							className={s.input}
							name="correo"
							type="email"
							placeholder="Ingresa tu correo..."
							required
						></input>
						<label className={s.label}>Mensaje:</label>
						<input
							className={s.textarea}
							name="mensaje"
							type="textarea"
							placeholder="Ingresa tu mensaje..."
							required
						></input>
						<button type="submit" className={s.button}>
							Enviar
						</button>
					</form>
				</div>
				<div className={s.right}>
					{/* hola */}
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
