import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { CityModule } from './city'
import { ImageModule } from './image'
import { PlaceModule } from './place'
import { UserModule } from './user'

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: ['.env']
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({ uri: configService.get('LOCAL_MONGO_URL') }),
			inject: [ConfigService]
		}),
		CityModule,
		PlaceModule,
		ImageModule,
		UserModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
