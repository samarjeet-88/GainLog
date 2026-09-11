


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

    static findUserByGoogleIdOrEmail = async (tx, tokenId, email) => {
        const result = await tx.query(`SELECT u.id, u.email, u."fullName", u."googleId" from "users" u where u."googleId"=$1 or u.email=$2`, [tokenId, email]);
        return result.rows[0];
    }

    static userCreateOAuthRepo = async (tx, id, fullName, email, googleId) => {
        await tx.query(`INSERT INTO "users" (id, "fullName", email, "googleId")
            VALUES ($1, $2, $3, $4)`, [id, fullName, email, googleId]);
    }

    static linkGoogleIdRepo = async (tx, id, googleId) => {
        await tx.query(`UPDATE "users" SET "googleId"=$1 WHERE id=$2`, [googleId, id]);
    }
}

export default AuthRepository;