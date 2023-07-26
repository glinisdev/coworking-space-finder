import { IsString, IsNotEmpty, IsOptional } from 'class-validator'
import { User } from '../../user'

export class CreateCityDTO {
	@IsString()
	@IsNotEmpty()
	name: string

	@IsOptional()
	createdBy?: User
}
