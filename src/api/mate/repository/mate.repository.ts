// ** Custom Module Imports
import { CustomRepository } from 'src/common/repository/typeorm-ex.decorator'
import { Repository } from 'typeorm'

// ** Domain Imports
import Mate from '../domain/mate.entity'

@CustomRepository(Mate)
export default class MateRepository extends Repository<Mate> {}
