import { EntityRepository, Repository } from "typeorm";
import { Account } from "../entities/account.entity";

@EntityRepository(User)
export class AccountRepository extends Repository<Account> { }