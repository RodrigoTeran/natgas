const { body } = require("express-validator");

exports.sendEntryValidator = [
	body("title")
		.notEmpty()
		.withMessage("El titulo es obligatorio")
		.isLength({ max: 50 })
		.withMessage("El titlo no puede tener más de 50 caracteres"),
	body("date").notEmpty().withMessage("La fecha es obligatoria"),
	body("comentarios")
		.notEmpty()
    .withMessage("El comentario es obligatorio")
    .isLength({ max: 1000 })
];

