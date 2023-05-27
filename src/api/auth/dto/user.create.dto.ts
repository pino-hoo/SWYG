// ** Validation Imports
import { IsBoolean, IsString } from 'class-validator'

export default class CreateUserDto {
  @IsString()
  email: string

  @IsString()
  password: string

  @IsString()
  name: string

  @IsString()
  birth: string

  @IsBoolean()
  male: boolean
}
