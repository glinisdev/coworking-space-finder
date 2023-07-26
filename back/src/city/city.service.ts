import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from '../user'
import { CITY_MODEL_NAME } from './city.constants'
import { CityDocument } from './city.schema'
import { City, CreateCityDTO } from './types'
import { ErrorCodes } from '../shared'

@Injectable()
export class CityService {
	constructor(
		@InjectModel(CITY_MODEL_NAME)
		private readonly cityModel: Model<CityDocument>
	) {}

	async create(city: CreateCityDTO, user: User): Promise<City> {
		city.name = city.name.toLowerCase()

		const existingCity = await this.findByName(city.name)
		if (existingCity) throw new BadRequestException(ErrorCodes.CITY_ALREADY_EXISTS)

		city.createdBy = user

		return this.cityModel.create(city)
	}

	async findByName(cityName: string): Promise<CityDocument> {
		return this.cityModel.findOne({ name: cityName })
	}
}
