import { Account } from "src/account/entities/account.entity";
import { EntityRepository, Repository } from "typeorm";


@EntityRepository(Account)
export class AccountRepository extends Repository<Account> { }