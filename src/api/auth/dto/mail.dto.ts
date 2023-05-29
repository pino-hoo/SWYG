// ** Validation Imports
import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export default class RequestMainDto {
  @ApiProperty({
    example: 'inhoo23@naver.com',
  })
  @IsString()
  email: string
}
