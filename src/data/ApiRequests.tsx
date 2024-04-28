export default class Api{
    static async Vehicles( marks:any, fuelTypes:any ): Promise<any[]>{
        try{
            const response = await fetch('http://192.168.8.104:5000/vehicles',{
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
            const response = await fetch('http://192.168.8.104:5000/fuelTypes');
            const json = await response.json();
            return json;
        }
        catch(error){
            return [];
        }
    }

    static async Marks(): Promise<any[]>{
        try{
            const response = await fetch('http://192.168.8.104:5000/marks');
            const json = await response.json();
            return json;
        }
        catch(error){
            return [];
        }
    }
}