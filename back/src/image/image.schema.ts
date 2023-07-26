import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Place, PLACE_MODEL_NAME } from '.././place'
import { User, USER_MODEL_NAME } from '.././user'
import { Image } from './types'

@Schema()
export class ImageSchemaClass implements Image {
	@Prop({ type: String }) url: string
	@Prop({ default: true }) active: boolean
	@Prop({ default: Date.now }) dateCreated: Date
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: PLACE_MODEL_NAME }) place: Place
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: USER_MODEL_NAME }) createdBy: User
}

export type ImageDocument = ImageSchemaClass & mongoose.Document
export const ImageSchema = SchemaFactory.createForClass(ImageSchemaClass)
