import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
}

export async function compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
}
