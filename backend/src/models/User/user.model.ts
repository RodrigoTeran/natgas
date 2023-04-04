import pool from "../../db/connection";
import { fromString, uuid } from "uuidv4";
import type { IUser } from "../../interfaces/User.interface";
import Roles from "../Roles/roles.model";
import { IServices } from "../../middlewares/roles.middleware";

class User {
    currentUser: IUser

    constructor(currentUser: IUser) {
        this.currentUser = currentUser;
    }

    static async register(
        id: string,
        username: string,
        sex: string,
        dateOfBirth: Date,
        weight: number,
        height: number,
        goal: string,
        level: string,
    ) {
        await pool.execute('UPDATE client SET username = ?, sex = ?, dateOfBirth = ? WHERE id = ?;', [
            username,
            sex,
            dateOfBirth,
            id
        ]);

        const idempotencyKeyWeight = uuid();
        await pool.execute('INSERT INTO weight(id, clientId, measurement) VALUES (?, ?, ?);', [
            idempotencyKeyWeight,
            id,
            weight
        ]);

        const idempotencyKeyHeight = uuid();
        await pool.execute('INSERT INTO height(id, clientId, measurement) VALUES (?, ?, ?);', [
            idempotencyKeyHeight,
            id,
            height
        ]);

        const idempotencyKeyGoal = uuid();
        await pool.execute('INSERT INTO goal(id, name) VALUES (?, ?);', [
            idempotencyKeyGoal,
            goal
        ]);

        await pool.execute('INSERT INTO clientGoal(clientId, goalId) VALUES (?, ?);', [
            id,
            idempotencyKeyGoal
        ]);

        const idempotencyKeyLevel = uuid();
        await pool.execute('INSERT INTO physicLevel(id, name) VALUES (?, ?);', [
            idempotencyKeyLevel,
            level
        ]);

        await pool.execute('INSERT INTO clientLevel(clientId, physicLevelId) VALUES (?, ?);', [
            id,
            idempotencyKeyLevel
        ]);
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

    static async checkService(id: string, service: IServices): Promise<IUser | null | boolean> {
        const user: IUser | null = await User.findById(id);

        if (user === null) {
            // No auth
            return null;
        }

        const isService: boolean = await Roles.checkUserService(user, service);

        if (!isService) return false;

        return user;
    }

    async save(providerId: string): Promise<IUser | null> {
        const idempotencyKey = fromString(providerId);

        await pool.execute(`INSERT INTO client(id, authProvider, authProviderId) VALUES
            (?, ?, ?);`,
            [
                idempotencyKey,
                'Google',
                providerId
            ]);

        const user = await User.findOne(providerId);

        return user;
    }

}

export default User;