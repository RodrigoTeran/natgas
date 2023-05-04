import React, { useState } from "react";
import Menu from "../Menu/Menu";
import styles from "./FAQ.module.css";
import ArrowIcon from "../icons/arrow-down.png";

type FaqData = {
	question: string;
	answer: string;
};

function FAQ() {
	const [activeIndexes, setActiveIndexes] = useState<number[]>([]);

	const handleAccordionClick = (index: number) => {
		if (activeIndexes.includes(index)) {
			setActiveIndexes(activeIndexes.filter((i) => i !== index));
		} else {
			setActiveIndexes([...activeIndexes, index]);
		}
	};

	const faqData: FaqData[] = [
		{
			question: "¿El proyecto Onyx me puede apoyar si tengo un problema de nutrición?",
			answer:
				"El proyecto Onyx se reserva a mostrar un catálogo de dietas balanceadas que aplican para la población en general. Cualquier deficiencia nutricional o condición médica deberá ser atendida por un medico especialista en el área.",
		},
		{
			question: "¿Los entrenamientos son para principiantes o usuarios avanzados?",
			answer:
				"En el Proyecto Onyx habrá una gama de programas de entrenamiento desde principiante hasta avanzado.",
		},
		{
			question: "¿Debo tener cierto conocimiento de nutrición o gimnasio para usar el proyecto Onyx?",
			answer:
				"No es necesario tener conocimiento previo para usar la aplicación, pero mientras más se esta informado del tema mayor es el provecho que se le puede sacar esta aplicación. Es recomendable que se tenga un conocimiento de la ejecución de los ejercicios básicos de gimnasio, de lo contrario acude a un instructor.",
		},
		{
			question: "¿Qué debo hacer si no se cómo hacer un ejercicio?",
			answer:
				"En el Proyecto Onyx se tendrán apoyos visuales mostrando el proceso de ejecución de la mayoría de los ejercicios. En de tener dudas, acude a tu instructor de gimnasio.",
		},
	];

	return (
		<div className={styles.faq}>
			<Menu />
			<h1 className={styles.title}>Preguntas frecuentes</h1>
			<p className={styles.p}>
				Aquí encontrarás preguntas frecuentes que te pueden ayudar a saber más acerca del proyecto y como funciona
			</p>
			<div className={styles.container}>
				{faqData.map((faq, index) => (
					<div key={index} className={styles.faqItem}>
						<div
							className={`${styles.faqQuestion} ${
								activeIndexes.includes(index) ? styles.active : ""
							}`}
							onClick={() => handleAccordionClick(index)}
						>
							{faq.question}
							{/* <span className={styles.arrowIcon}>
								<img
									src={ArrowIcon}
									className={
										activeIndexes.includes(index) ? styles.arrowUp : ""
									}
									alt="Arrow icon"
								/>
							</span> */}
						</div>
						<div
							className={`${styles.faqAnswer} ${
								activeIndexes.includes(index) ? styles.active : ""
							}`}
						>
							{faq.answer}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default FAQ;
