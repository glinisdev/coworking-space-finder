import { Module } from '@nestjs/common'
import { IMAGE_MODEL_NAME } from './image.constants'
import { ImageController } from './image.controller'
import { ImageService } from './image.service'
import { ImageSchema } from './image.schema'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
	imports: [MongooseModule.forFeature([{ name: IMAGE_MODEL_NAME, schema: ImageSchema }])],
	controllers: [ImageController],
	providers: [ImageService],
	exports: [ImageService]
})
export class ImageModule {}
