import { Body, Controller, Post } from '@nestjs/common'
import { CreateUserDTO, LoginUserDTO, User, UserLoginResponse } from './types'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Post('create')
	async create(@Body() user: CreateUserDTO): Promise<User> {
		return await this.userService.createUser(user)
	}

	@Post('login')
	async login(@Body() user: LoginUserDTO): Promise<UserLoginResponse> {
		return await this.userService.login(user)
	}
}
