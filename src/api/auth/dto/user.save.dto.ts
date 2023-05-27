// ** Validation Imports
import { IsBoolean, IsString } from 'class-validator'

// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger'

export default class RequestUserSaveDto {
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

  @ApiProperty({
    example: '김인후',
  })
  @IsString()
  name: string

  @ApiProperty({
    example: '2023-03-02',
  })
  @IsString()
  birth: string

  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  male: boolean
}
