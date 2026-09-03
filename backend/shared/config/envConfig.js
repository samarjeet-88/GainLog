import "dotenv/config"


const envConfig = {
    db: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        url: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    },
    app: {
        port: process.env.APP_PORT,
        env: process.env.APP_ENV
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        accessTokenExpiryTime: process.env.ACCESS_TOKEN_EXPIRE_MINUTES
    }
}


export default envConfig;