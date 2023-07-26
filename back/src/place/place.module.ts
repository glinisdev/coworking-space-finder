import { forwardRef, Module } from '@nestjs/common'
import { PlaceService } from './place.service'
import { PlaceController } from './place.controller'
import { PlaceSchema } from './place.schema'
import { PLACE_MODEL_NAME } from './place.constants'
import { MongooseModule } from '@nestjs/mongoose'
import { ImageModule } from '../image'
import { CityModule } from '../city'

@Module({
	imports: [
		MongooseModule.forFeature([{ name: PLACE_MODEL_NAME, schema: PlaceSchema }]),
		forwardRef(() => CityModule),
		forwardRef(() => ImageModule)
	],
	providers: [PlaceService],
	controllers: [PlaceController]
})
export class PlaceModule {}
