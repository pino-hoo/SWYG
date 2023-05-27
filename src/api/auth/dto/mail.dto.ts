// ** Validation Imports
import { IsString } from 'class-validator'

export default class MailDto {
  @IsString()
  email: string
}
