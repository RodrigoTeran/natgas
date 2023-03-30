export interface IUser {
    id: string;
    username: string;
    authProvider: "Google";
    authProviderId: string;
    sex: "M" | "F";
    dateOfBirth: Date;
    imageId: string;
    createdAt: Date
}