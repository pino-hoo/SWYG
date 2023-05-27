// ** Typeorm Imports
import { Repository } from 'typeorm'
import { CustomRepository } from 'src/common/repository/typeorm-ex.decorator'

// ** Domain Imports
import Point from '../domain/point.entity'

@CustomRepository(Point)
export default class PointRepository extends Repository<Point> {}
