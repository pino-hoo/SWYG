// ** Validation Imports
import { IsString } from 'class-validator'

export default class RequestBookSaveDto {
  @IsString()
  title: string

  @IsString()
  contents: string

  //   @IsDate()
  //   datetime: Date

  @IsString()
  authors: string

  @IsString()
  publisher: string

  @IsString()
  thumbnail: string

  @IsString()
  isbn: string
}
