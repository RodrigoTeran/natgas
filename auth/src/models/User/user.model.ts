import pool from "../../db/connection";
import type { IUser } from "../../interfaces/User.interface";

class User {
    currentUser: IUser

    constructor(currentUser: IUser) {
        this.currentUser = currentUser;
    }

    static async findOne(providerId: string): Promise<IUser | null> {
        const [rows] = await pool.execute('SELECT * FROM client WHERE authProviderId = ? LIMIT 1;', [providerId]);

        if (rows.length === 0) {
            return null;
        }

        const user = rows[0];
        return user;
    }

    static async findById(id: string): Promise<IUser | null> {
        const [rows] = await pool.execute('SELECT * FROM client WHERE id = ? LIMIT 1;', [id]);

        if (rows.length === 0) {
            return null;
        }

        const user = rows[0];
        return user;
    }

    async save() {
        await pool.execute(`INSERT INTO client(id, authProvider, authProviderId) VALUES
            (UUID_TO_BIN(UUID()), ?, ?);`,
            [
                this.currentUser.authProvider,
                this.currentUser.authProviderId
            ]);

        return;
    }

}

export default User;