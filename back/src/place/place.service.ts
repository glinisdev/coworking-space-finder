import { Injectable, BadRequestException, NotFoundException, Inject, forwardRef } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CityService } from '../city'
import { ImageService } from '../image'
import { ErrorCodes } from '../shared'
import { User } from '../user'
import { PLACE_MODEL_NAME } from './place.constants'
import { PlaceDocument } from './place.schema'
import { CreatePlaceDTO, GetPlaceByIdByCityDTO, Place, PlaceResponseWithImages } from './types'

@Injectable()
export class PlaceService {
	constructor(
		@InjectModel(PLACE_MODEL_NAME)
		private readonly placeModel: Model<PlaceDocument>,
		@Inject(forwardRef(() => CityService))
		private cityService: CityService,
		@Inject(forwardRef(() => ImageService))
		private imageService: ImageService
	) {}

	async create(place: CreatePlaceDTO, user: User): Promise<Place> {
		const existingPlace = await this.findByNameAndCity(place.name, place.city)
		if (existingPlace) throw new BadRequestException(ErrorCodes.PLACE_ALREADY_EXISTS)

		place.createdBy = user

		return this.placeModel.create(place)
	}

	async getPlacesByCity(city: string): Promise<PlaceResponseWithImages[]> {
		const existingCity = await this.cityService.findByName(city.toLowerCase())
		if (!existingCity) throw new NotFoundException(ErrorCodes.CITY_NOT_FOUND)

		const places = await this.placeModel.find({ city: existingCity._id })
		const placesResponse: PlaceResponseWithImages[] = []

		for (const place of places) {
			const images = await this.imageService.findByPlaceId(place._id)

			const placeObject = place.toObject()
			placesResponse.push({ ...placeObject, images })
		}

		return placesResponse
	}

	async getPlaceByIdByCity(dto: GetPlaceByIdByCityDTO): Promise<PlaceResponseWithImages> {
		const existingCity = await this.cityService.findByName(dto.city)
		if (!existingCity) throw new NotFoundException(ErrorCodes.CITY_NOT_FOUND)

		const place = await this.placeModel.findById({ _id: dto.id })
		if (!place) throw new NotFoundException(ErrorCodes.PLACE_NOT_FOUND)

		const images = await this.imageService.findByPlaceId(dto.id)

		return { ...place.toObject(), images }
	}

	async findPlaceById(id: string): Promise<PlaceDocument> {
		return this.placeModel.findById(id)
	}

	async findByNameAndCity(name, cityId): Promise<PlaceDocument> {
		return this.placeModel.findOne({ name, city: cityId })
	}
}
