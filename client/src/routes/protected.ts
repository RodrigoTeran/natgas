const unprotectedRoutes = new Set();
unprotectedRoutes.add("/iniciar-sesion");
// unprotectedRoutes.add("/contact");
// unprotectedRoutes.add("/faq");
// unprotectedRoutes.add("/sobre-nosotros");

const protectedRoutes = new Set();
protectedRoutes.add("/info-registro");
protectedRoutes.add("/perfil");
protectedRoutes.add("/inicio");
protectedRoutes.add("/dietas");
protectedRoutes.add("/medidas");
protectedRoutes.add("/roles");
protectedRoutes.add("/bitacora");
protectedRoutes.add("/consultar-entrada");
protectedRoutes.add("/ejercicios");

const routes = {
	unprotectedRoutes,
	protectedRoutes,
};

export default routes;
