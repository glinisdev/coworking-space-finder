import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Role, User } from '../user'
import { CityService } from './city.service'
import { City, CreateCityDTO } from './types'
import { RolesGuard, Roles, CurrentUser } from '../shared'

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller('city')
export class CityController {
	constructor(private cityService: CityService) {}

	@Post('create')
	async createCity(@Body() city: CreateCityDTO, @CurrentUser() user: User): Promise<City> {
		return await this.cityService.create(city, user)
	}
}
