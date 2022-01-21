import { createContext, ReactNode } from "react";
import { api } from "../service/api";

type SignInCredentials = {
	email: string;
	password: string;
}

type AuthContextData = {
	signIn(credentials: SignInCredentials): Promise<void>;
	isAuthenticated: boolean;
}

type AauthProviderProps = {
	children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: AauthProviderProps) => {
	const isAuthenticated = false;

	const signIn = async ({ email, password }: SignInCredentials) => {
		try {
			const response = await api.post('sessions',{
				email,
				password
			});

			console.log(response.data)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<AuthContext.Provider value={{ signIn, isAuthenticated }}>
			{ children }
		</AuthContext.Provider>
	)

}
