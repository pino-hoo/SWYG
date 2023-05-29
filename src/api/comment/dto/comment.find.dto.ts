// ** Validation Imports
import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export default class RequestCommentFindDto {
  @ApiProperty({
    example: 'text',
  })
  @IsString()
  text: string
}
