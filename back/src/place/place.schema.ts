import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { CITY_MODEL_NAME, City } from '.././city'
import { User, USER_MODEL_NAME } from '.././user'
import { Place } from './types'

@Schema()
export class PlaceSchemaClass implements Place {
	@Prop({ type: String }) name: string
	@Prop({ type: String }) address: string
	@Prop({ type: String }) website: string
	@Prop({ default: true }) active: boolean
	@Prop({ default: Date.now }) dateCreated: Date
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: CITY_MODEL_NAME }) city: City
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: USER_MODEL_NAME }) createdBy: User
}

export type PlaceDocument = PlaceSchemaClass & mongoose.Document
export const PlaceSchema = SchemaFactory.createForClass(PlaceSchemaClass)
