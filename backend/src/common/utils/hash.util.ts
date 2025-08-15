import * as bcrypt from "bcrypt"

export default async function hashPassword(password) {
    const salt = await bcrypt.genSalt()
    return bcrypt.hash(password, salt)
}