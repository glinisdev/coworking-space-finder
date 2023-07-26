import { IsString, IsNotEmpty, IsOptional, IsMongoId, IsUrl } from 'class-validator'
import { User } from '../../user'

export class CreatePlaceDTO {
	@IsString()
	@IsNotEmpty()
	name: string

	@IsString()
	@IsNotEmpty()
	address: string

	@IsUrl()
	@IsString()
	@IsNotEmpty()
	website: string

	@IsMongoId()
	@IsString()
	@IsNotEmpty()
	city: string

	@IsOptional()
	createdBy?: User
}

export class GetPlaceByIdByCityDTO {
	@IsString()
	@IsNotEmpty()
	city: string

	@IsMongoId()
	@IsString()
	@IsNotEmpty()
	id: string
}

export class GetPlaceByCityDTO {
	@IsString()
	@IsNotEmpty()
	city: string
}
