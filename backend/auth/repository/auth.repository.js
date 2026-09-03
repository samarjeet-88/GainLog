


class AuthRepository {

    static emailAlreadyPresentRepo = async (tx, email) => {
        const result = await tx.query(`Select 1 from "users" u where u.email=$1`, [email])
        return result;
    }

    static userCreateRepo = async (tx, id, fullName, email, hashedPassword) => {
        await tx.query(`INSERT INTO "users" (id,"fullName",email,password)
            VALUES ($1,$2,$3,$4)`, [id, fullName, email, hashedPassword])
    }

    static refreshTokenCreateRepo = async (tx, id, tokenValue, expiresAt) => {
        await tx.query(`INSERT INTO "refreshToken"("userId","tokenValue","expiresAt") VALUES ($1,$2,$3)`, [id, tokenValue, expiresAt])
    }
}

export default AuthRepository;