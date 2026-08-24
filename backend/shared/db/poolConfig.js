import {Pool} from "pg";
import envConfig from "../config/envConfig.js";


const pool=new Pool({
    connectionString:envConfig.db.url,

    statement_timeout:30000,
    query_timeout:40000,
    lock_timeout:5000,
    idle_in_transaction_session_timeout:60000,

    max:50,
    min:20,
    connectionTimeoutMillis:10000,
    idleTimeoutMillis:30000,

    keepAlive:true,
    keepAliveInitialDelayMillis:10000
})

export default pool;