import { openDatabase } from 'react-native-sqlite-storage';

export class SQLiteProvider{
    static async CreateUserData(){
        var db = await this.ConnectToDatabase('autofinder.db');
        
        db.executeSql(`CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            login TEXT,
            password INTEGER
          )`);
    }

    static async GetUserData(){
        var db = await this.ConnectToDatabase('autofinder.db');

        db.transaction((tx) => {
            tx.executeSql(
                'select * from table',
                [],
                (tx, results) => {
                    const rows = results.rows;
                }
            );
        });
    }

    private static async ConnectToDatabase(path:string) {
        return openDatabase({
            name: path,
            location: 'default'
        });
    }
}

export default SQLiteProvider;