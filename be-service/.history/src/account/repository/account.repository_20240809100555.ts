import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { Account } from "../entities/account.entity";

@EntityRepository(User)
export class AccountRepository extends Repository<Account> { }