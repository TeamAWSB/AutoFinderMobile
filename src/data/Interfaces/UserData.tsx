export default interface UserData {
    id: number,
    name: string,
    surname: string; 
    email: string,
    birthOfYear: number,
    country: string,
    password: string,
    error?: string;
}