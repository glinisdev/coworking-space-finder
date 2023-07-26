export interface User {
	_id?: string
	firstName: string
	lastName: string
	email: string
}

export interface UserAuthPayload {
	email: string
	id: string
	role: Role
}

export interface UserLoginResponse {
	token: string
	user: User
}

export enum Role {
	ADMIN = 'admin',
	SUPER_ADMIN = 'super.admin',
	USER = 'user'
}
