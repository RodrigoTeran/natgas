export interface IUser {
	id: string;
	username: string;
	authProvider: "Google";
	authProviderId: string;
	sex: "M" | "F";
	dateOfBirth: Date;
	imageId: string;
	createdAt: Date;
	role: "Administrador" | "Cliente";
	level: string;
	goal: string;
}
