import { IsDate, IsString } from 'class-validator'

export class BookSaveDto {
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
