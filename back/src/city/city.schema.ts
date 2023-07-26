import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { User, USER_MODEL_NAME } from '.././user'
import { City } from './types'

@Schema()
export class CitySchemaClass implements City {
	@Prop({ type: String }) name: string
	@Prop({ default: true }) active: boolean
	@Prop({ default: Date.now }) dateCreated: Date
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: USER_MODEL_NAME }) createdBy: User
}

export type CityDocument = CitySchemaClass & mongoose.Document
export const CitySchema = SchemaFactory.createForClass(CitySchemaClass)
