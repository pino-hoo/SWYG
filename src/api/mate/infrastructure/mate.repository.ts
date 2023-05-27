import { EntityRepository, Repository } from 'typeorm'
import { Mate } from '../domain/mate.entity'

@EntityRepository(Mate)
export class MateRepository extends Repository<Mate> {}
