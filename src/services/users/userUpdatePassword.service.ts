import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import {compare, hash} from "bcryptjs"

const userUpdatePasswordService = async (email: string, password: string) => {
    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find()

    const account = users.find(user => user.email === email)

    if (await compare(password, account!.password)) {
        throw new Error('Inform a different password')
    }

    const newPassword = await hash(password, 10)

    await userRepository.update(account!.id, {password: newPassword})

    return true
}

export default userUpdatePasswordService