import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ErrorCodes } from '../shared'
import { User } from '../user'
import { IMAGE_MODEL_NAME } from './image.constants'
import { ImageDocument } from './image.schema'
import { CreateImageDTO, Image } from './types'

@Injectable()
export class ImageService {
	constructor(
		@InjectModel(IMAGE_MODEL_NAME)
		private readonly imageModel: Model<ImageDocument>
	) {}

	async create(image: CreateImageDTO, user: User): Promise<Image> {
		const existingImage = await this.findByURL(image.url)
		if (existingImage) throw new BadRequestException(ErrorCodes.IMAGE_ALREADY_EXISTS)

		image.createdBy = user

		return this.imageModel.create(image)
	}

	async findByPlaceId(id: string): Promise<Image[]> {
		return this.imageModel.find({ place: id })
	}

	async findByURL(imageurl: string): Promise<ImageDocument> {
		return this.imageModel.findOne({ url: imageurl })
	}
}
