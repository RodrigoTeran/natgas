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
			question: "¿Lorem ipsum dolor?",
			answer:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde enim earum, neque perspiciatis quasi error omnis perferendis tempore, laborum aliquid rem! Quis dolor mollitia saepe sint nisi, earum architecto adipisci hic repellat placeat maxime illum.",
		},
		{
			question: "¿Lorem ipsum dolor?",
			answer:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde enim earum, neque perspiciatis quasi error omnis perferendis tempore, laborum aliquid rem! Quis dolor mollitia saepe sint nisi, earum architecto adipisci hic repellat placeat maxime illum.",
		},
		{
			question: "¿Lorem ipsum dolor?",
			answer:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde enim earum, neque perspiciatis quasi error omnis perferendis tempore, laborum aliquid rem! Quis dolor mollitia saepe sint nisi, earum architecto adipisci hic repellat placeat maxime illum.",
		},
		{
			question: "¿Lorem ipsum dolor?",
			answer:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde enim earum, neque perspiciatis quasi error omnis perferendis tempore, laborum aliquid rem! Quis dolor mollitia saepe sint nisi, earum architecto adipisci hic repellat placeat maxime illum.",
		},
		{
			question: "¿Lorem ipsum dolor?",
			answer:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde enim earum, neque perspiciatis quasi error omnis perferendis tempore, laborum aliquid rem! Quis dolor mollitia saepe sint nisi, earum architecto adipisci hic repellat placeat maxime illum.",
		},
	];

	return (
		<div className={styles.faq}>
			<Menu />
			<h1 className={styles.title}>Frequently Asked Questions</h1>
			<p className={styles.p}>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
				natus dignissimos laudantium molestias voluptatibus id autem expedita
				provident ex perferendis, fuga quaerat neque impedit nihil.
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
