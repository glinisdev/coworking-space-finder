import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { ErrorCodes } from '../../../shared'
import { UserAuthPayload } from '../../types'
import { UserService } from '../../user.service'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
	constructor(private userService: UserService, private configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get('AUTH_SECRET_KEY')
		})
	}

	async validate(payload: UserAuthPayload) {
		const isValidated = await this.userService.findById(payload.id)

		if (!isValidated) throw new UnauthorizedException(ErrorCodes.WRONG_TOKEN)

		return isValidated
	}
}
