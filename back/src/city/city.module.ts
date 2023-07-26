import { Module } from '@nestjs/common'
import { CITY_MODEL_NAME } from './city.constants'
import { CityController } from './city.controller'
import { CityService } from './city.service'
import { CitySchema } from './city.schema'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
	imports: [MongooseModule.forFeature([{ name: CITY_MODEL_NAME, schema: CitySchema }])],
	controllers: [CityController],
	providers: [CityService],
	exports: [CityService]
})
export class CityModule {}
