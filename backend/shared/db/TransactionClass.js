import logger from "../config/logConfig.js";
import dbConnection from "./index.js";



class Transaction {

    client = null;


    constructor(client) {
        this.client = client;
    }

    static async start() {
        const client = await dbConnection.getDBConnection();
        await client.query('BEGIN');
        return new Transaction(client);
    }

    static async runTransaction(fn) {
        const tx = await Transaction.start();
        try {
            const result = await fn(tx);
            await tx.commit();
            return result;
        } catch (error) {
            await tx.rollback();
            logger.error(`Error when commiting transaction ${error}`)
            throw error;
        }
    }

    async query(sql, params) {
        return this.client.query(sql, params);
    }

    async commit() {
        try {
            await this.client.query('COMMIT');
        } finally {
            this.client.release();
        }
    }

    async rollback() {
        try {
            await this.client.query('ROLLBACK')
        } catch (error) {
            logger.error(`Error during rollback ${error}`)
        } finally {
            this.client.release();
        }
    }

}



export default Transaction;