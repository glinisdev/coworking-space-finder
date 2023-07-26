import { IsString, IsNotEmpty, IsOptional, IsMongoId } from 'class-validator'
import { User } from '../../user'

export class CreateImageDTO {
	@IsString()
	@IsNotEmpty()
	url: string

	@IsMongoId()
	@IsString()
	@IsNotEmpty()
	place: string

	@IsOptional()
	createdBy?: User
}
