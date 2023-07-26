import { IsString, IsNotEmpty, IsEmail, IsEnum, IsOptional } from 'class-validator'
import { Role } from './user.entity'

export class CreateUserDTO {
	@IsString()
	@IsNotEmpty()
	firstName: string

	@IsString()
	@IsNotEmpty()
	lastName: string

	@IsString()
	@IsEmail()
	@IsNotEmpty()
	email: string

	@IsString()
	@IsNotEmpty()
	password: string

	@IsEnum(Role)
	@IsString()
	@IsOptional()
	role?: Role
}

export class LoginUserDTO {
	@IsString()
	@IsEmail()
	@IsNotEmpty()
	email: string

	@IsString()
	@IsNotEmpty()
	password: string
}
