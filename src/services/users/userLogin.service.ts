import { IUserLogin } from "../../interfaces/users";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

const userLoginService = async ({email, password}: IUserLogin) => {
    const userRepository = AppDataSource.getRepository(User)
    
    const account = await userRepository.findOne({
        where: {
            email: email
        }
    })

    if(!account) {
        throw new Error("Wrong email or password")
    }

    const passwordMatch = await compare(password, account.password)

    if(!passwordMatch) {
        throw new Error("Wrong email or password")
    }

    const token = jwt.sign(
        {email: email, userId: account.id},
        String(process.env.SECRET_KEY),
        {expiresIn: '2h'}
    )


    return token
}

export default userLoginService