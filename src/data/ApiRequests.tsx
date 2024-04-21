export default class Api{
    static async Vehicles(): Promise<any[]>{
        try{
            const response = await fetch('http://192.168.8.104:5000/vehicles');
            const json = await response.json();
            return json;
        }
        catch(error){
            return [];
        }
    }
}