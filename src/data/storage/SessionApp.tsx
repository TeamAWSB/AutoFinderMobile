import EncryptedStorage from 'react-native-encrypted-storage';

export class SessionApp{
    static async Set(userId:number, login: string, password: string){
        try {
            await EncryptedStorage.setItem(
                "user_session",
                JSON.stringify({
                    userId: userId,
                    login : login,
                    password : password
                })
            );
            return true;
        } catch { return false; }
    }

    static async Get(){
        try {   
            const session = await EncryptedStorage.getItem("user_session");
        
            if (session !== null && session !== undefined) {
                const userData = JSON.parse(session);
                return userData;
            }
            return null;
        } catch { return null; }
    }
}

export default SessionApp;