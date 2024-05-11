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
}