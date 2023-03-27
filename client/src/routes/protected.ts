const unprotectedRoutes = new Set();
unprotectedRoutes.add("/iniciar-sesion");
unprotectedRoutes.add("/contact");
unprotectedRoutes.add("/faq");
unprotectedRoutes.add("/sobre-nosotros");

const protectedRoutes = new Set();
protectedRoutes.add("/info-registro");
protectedRoutes.add("/home");

const routes = {
    unprotectedRoutes,
    protectedRoutes
}

export default routes;