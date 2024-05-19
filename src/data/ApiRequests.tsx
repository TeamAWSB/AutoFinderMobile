import { ToastAndroid } from "react-native";
import UserData from "./Interfaces/UserData";
import CryptoJS from 'crypto-js';

const server_address = 'http://192.168.8.187:5000/';

export default class Api{
    static async Vehicles( marks:any, fuelTypes:any ): Promise<any[]>{
        try{
            const response = await fetch(`${server_address}vehicles`,{
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    marks: marks,
                    fuelTypes: fuelTypes
                })
            });
            const json = await response.json();
            return json;
        }
        catch(error){
            return [];
        }
    }

    static async GetLikedVehicles( userId:number ): Promise<any[]>{
        try{
            const response = await fetch(`${server_address}favoriteVehicles`,{
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userId
                })
            });
            const json = await response.json();
            return json;
        }
        catch(error){
            return [];
        }
    }

    static async FuelTypes(): Promise<any[]>{
        try{
            const response = await fetch(`${server_address}fuelTypes`);
            const json = await response.json();
            return json;
        }
        catch(error){
            return [];
        }
    }

    static async Marks(): Promise<any[]>{
        try{
            const response = await fetch(`${server_address}marks`);
            const json = await response.json();
            return json;
        }
        catch(error){
            return [];
        }
    }

    static async Login( email:string, password:string): Promise<UserData | null>{
        try{
            const encryptedPassword = CryptoJS.SHA256(password).toString();

            const response = await fetch(`${server_address}login`,{
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: encryptedPassword
                })
            });
            const json:UserData = await response.json();
            return json;
        }
        catch(error){
            return null;
        }
    }

    static async Register( data:UserData ): Promise<boolean>{
        try{
            const encryptedPassword = CryptoJS.SHA256(data.password).toString();

            const response = await fetch(`${server_address}register`,{
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: data.name,
                    surname: data.surname,
                    email: data.email,
                    birthOfYear: data.birthOfYear,
                    country: data.country,
                    password: encryptedPassword
                })
            });
            const json = await response.json();

            console.warn(`status: ${json?.status}`);
            console.warn(`error: ${json?.error}`);
            if(json?.status && json?.error == null)
                return true;
            else
                return false;
        }
        catch{
            return false;
        }
    }

    static async GetUserData( email:string ): Promise<UserData | null>{
        try{
            const response = await fetch(`${server_address}user`,{
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email
                })
            });
            const json:UserData = await response.json();
            return json;
        }
        catch(error){
            return null;
        }
    }
}