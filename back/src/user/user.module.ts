import { Module } from '@nestjs/common'
import { USER_MODEL_NAME } from './user.constants'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { UserSchema } from './user.schema'
import { MongooseModule } from '@nestjs/mongoose'
import { PasswordHasherService } from './auth/password-hasher/password-hasher.service'
import { JwtStrategyService } from './auth/jwt-strategy/jwt-strategy.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({ secret: configService.get('AUTH_SECRET_KEY') }),
			inject: [ConfigService]
		}),
		MongooseModule.forFeature([{ name: USER_MODEL_NAME, schema: UserSchema }]),
		ConfigModule
	],
	controllers: [UserController],
	providers: [UserService, PasswordHasherService, JwtStrategyService]
})
export class UserModule {}
