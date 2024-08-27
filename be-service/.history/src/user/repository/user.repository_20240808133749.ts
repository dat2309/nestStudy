import { Repository } from "typeorm";
import { User } from "../entities/user.entity";

@Repository(User)
export class UserRepository extends Repository<User> { }