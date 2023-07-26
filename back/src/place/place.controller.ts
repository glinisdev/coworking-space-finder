import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Role, User } from '../user'
import { PlaceService } from './place.service'
import { CreatePlaceDTO, GetPlaceByCityDTO, GetPlaceByIdByCityDTO, Place, PlaceResponseWithImages } from './types'
import { RolesGuard, Roles, CurrentUser } from '../shared'

@Controller('place')
export class PlaceController {
	constructor(private placeService: PlaceService) {}

	@UseGuards(AuthGuard('jwt'), RolesGuard)
	@Roles(Role.ADMIN, Role.SUPER_ADMIN)
	@Post('create')
	async create(@Body() place: CreatePlaceDTO, @CurrentUser() user: User): Promise<Place> {
		return await this.placeService.create(place, user)
	}

	@Get(':city')
	async getPlacesByCity(@Param() dto: GetPlaceByCityDTO): Promise<PlaceResponseWithImages[]> {
		return await this.placeService.getPlacesByCity(dto.city)
	}

	@Get(':city/:id')
	async getPlaceByIdByCity(@Param() dto: GetPlaceByIdByCityDTO): Promise<Place> {
		return await this.placeService.getPlaceByIdByCity(dto)
	}
}
