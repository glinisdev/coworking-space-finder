import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Role, User } from './types'
import { USER_MODEL_NAME } from './user.constants'

@Schema()
export class UserSchemaClass implements User {
	@Prop({ type: String }) firstName: string
	@Prop({ type: String }) lastName: string
	@Prop({ type: String }) email: string
	@Prop({ type: String }) password: string
	@Prop({ type: String, enum: Role, default: Role.USER }) role: Role
	@Prop({ default: true }) active: boolean
	@Prop({ default: Date.now }) dateCreated: Date
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: USER_MODEL_NAME }) createdBy: User
}

export type UserDocument = UserSchemaClass & mongoose.Document
export const UserSchema = SchemaFactory.createForClass(UserSchemaClass)
