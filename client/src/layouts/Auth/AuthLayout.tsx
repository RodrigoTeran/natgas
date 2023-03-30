import { useState, useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';
import { getAuthClient } from "../../routes/auth/auth.routes";
import { setClientIdCache } from "../../cache/auth";
import routes from "../../routes/protected";
import { AppContext } from "../../App";
import MessagesLayout from "../Messages/Messages";

let controllerFetch: boolean = false;

const AuthLayout = () => {
    const { setUser } = useContext(AppContext);
    const location = useLocation();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getClient = (): void => {
        getParams();

        const doFetch = async (): Promise<void> => {
            setIsLoading(true);
            const data = await getAuthClient();

            setIsLoading(false);
            setUser(data)

            // If auth
            if (routes.unprotectedRoutes.has(location.pathname) && data !== null) {
                // Redirect
                navigate("/");
                return;
            }

            // If no auth
            if (routes.protectedRoutes.has(location.pathname) && data === null) {
                // Redirect
                navigate("/");
                return;
            }
        };

        void doFetch();
    };

    const getParams = () => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        for (let i = 0; i < Object.keys(params).length; i++) {
            const key = Object.keys(params)[i];
            const value = params[key];

            if (key === "token") {
                setClientIdCache(value);
                break;
            }
        }
    }

    useEffect(() => {
        if (controllerFetch) return;
        controllerFetch = true;
        getClient();
    }, []);

    return (
        <>
            {isLoading && (
                <div>
                    Cargando...
                </div>
            )}
            <MessagesLayout>
                {!isLoading && <Outlet />}
            </MessagesLayout>
        </>
    )
};
export default AuthLayout;