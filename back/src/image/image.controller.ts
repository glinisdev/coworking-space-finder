import { Controller, Post, Body, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Role, User } from '../user'
import { ImageService } from './image.service'
import { CreateImageDTO, Image } from './types'
import { RolesGuard, Roles, CurrentUser } from '../shared'

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller('image')
export class ImageController {
	constructor(private imageService: ImageService) {}

	@Post('create')
	async create(@Body() image: CreateImageDTO, @CurrentUser() user: User): Promise<Image> {
		return await this.imageService.create(image, user)
	}
}
