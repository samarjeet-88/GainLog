


class RedisService {

    static async setString(client, key, value, options = {}) {
        const expireTime = options.expire || options.EX;
        if (expireTime) {
            await client.set(key, value, "EX", expireTime);
        } else {
            await client.set(key, value);
        }
    }

    static async getString(client, key) {
        const value = await client.get(key);
        return value;
    }
}

export default RedisService