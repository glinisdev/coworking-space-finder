import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ErrorCodes } from '../shared'
import { PasswordHasherService } from './auth/password-hasher/password-hasher.service'
import { CreateUserDTO, LoginUserDTO, User, UserAuthPayload, UserLoginResponse } from './types'
import { USER_MODEL_NAME } from './user.constants'
import { UserDocument } from './user.schema'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(USER_MODEL_NAME)
		private readonly userModel: Model<UserDocument>,
		private passwordHasherServise: PasswordHasherService,
		private jwtService: JwtService
	) {}

	async createUser(dto: CreateUserDTO): Promise<User> {
		const user = await this.userModel.findOne({ email: dto.email })
		if (user) {
			throw new BadRequestException(ErrorCodes.USER_ALREADY_EXISTS)
		}

		const encryptedPassword = await this.passwordHasherServise.hashPassword(dto.password)

		dto.password = encryptedPassword

		const newUser = new this.userModel({
			email: dto.email,
			firstName: dto.firstName,
			lastName: dto.lastName,
			password: dto.password
		})

		try {
			const createdUser = await newUser.save()
			return createdUser
		} catch (error) {
			console.log(`User creation error - ${error}`)
			throw new BadRequestException(ErrorCodes.DEFAULT_ERROR)
		}
	}

	async login(dto: LoginUserDTO): Promise<UserLoginResponse> {
		const user = await this.userModel.findOne({ email: dto.email })
		if (!user) throw new BadRequestException(ErrorCodes.USER_NOT_FOUND)

		const payload: UserAuthPayload = {
			email: user.email,
			id: user._id,
			role: user.role
		}

		const matchedPassword = await this.passwordHasherServise.comparePassword(dto.password, user.password)
		if (!matchedPassword) throw new UnauthorizedException(ErrorCodes.WRONG_PASSWORD)

		const token = await this.jwtService.signAsync(payload, { expiresIn: '1w' })

		return { token, user }
	}

	async findById(userId: string): Promise<User> {
		const user = await this.userModel.findById(userId)
		if (!user) throw new BadRequestException(ErrorCodes.USER_NOT_FOUND)

		return user
	}
}
