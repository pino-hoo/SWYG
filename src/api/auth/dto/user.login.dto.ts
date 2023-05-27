// ** Validation Imports
import { IsString } from 'class-validator'

// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger'

export default class RequestUserLoginDto {
  @ApiProperty({
    example: 'inhoo23@naver.com',
  })
  @IsString()
  email: string

  @ApiProperty({
    example: '1234',
  })
  @IsString()
  password: string
}
