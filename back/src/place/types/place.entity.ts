import { City } from '../../city'
import { Image } from '../../image'

export interface Place {
	_id?: string
	name: string
	address: string
	website: string
	city: City
}

export interface PlaceResponseWithImages {
	_id?: string
	name: string
	address: string
	website: string
	city: City
	images: Image[]
}
