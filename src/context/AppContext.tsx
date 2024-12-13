import { createContext, ReactElement, useState } from "react";

const AppContext = createContext(
    {} as {
        backendUrl: string,
        isLoggedIn: boolean,
        setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
        userData: any,
        setUserData: React.Dispatch<React.SetStateAction<any>>,
        login: () => Promise<boolean>,
    }
);

function AppContextProvider(props: { children: ReactElement }) {
    const backendUrl = import.meta.env.VITE_SERVER_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState();

    async function login(): Promise<boolean> {
        const res = await fetch(backendUrl + "/user", { credentials: 'include' });
        const data = await res.json();
        if (!data.success) {
            return false;
        }
        const userData = data.userData;
        setUserData(userData);
        setIsLoggedIn(true);
        return true;
    }

    const value = {
        backendUrl,
        isLoggedIn, setIsLoggedIn,
        userData, setUserData,
        login
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
}

export { AppContext, AppContextProvider };