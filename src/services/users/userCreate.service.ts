import { User } from "../../entities/user.entity";
import { IUserCreate } from "../../interfaces/users";
import { AppDataSource } from "../../data-source";
import { hash } from "bcryptjs";

const userCreateService = async ({name, email, password}: IUserCreate) => {
    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find()

    const emailAlreadyExists = users.find(user => user.email === email)

    if (emailAlreadyExists) {
        throw new Error("Email already being used")
    }

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = await hash(password, 10)

    userRepository.create(user);
    await userRepository.save(user);

    return user;
}

export default userCreateService;