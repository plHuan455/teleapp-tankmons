
export interface IUserInfo {
    user_id: number
    safe_id: string
    username: string
    level: number
    id_token: string
    avatar: string
    access_token: string
    ton_deposit: number
    is_checkin_today: boolean
    current_day: number
    energy: number
    first_login: boolean
    referral_by: string
    ton: number
    coin: number
    clan_id: number
    created_at: string
    first_coin: number
    firstname: string
    lastname: string
    box: number
    max_energy: number
    star_level: number // max start up level
    star_used: number
    star: number
    show_bonus?: boolean
}

export interface SignInParams {
    telegram_id: number
    username?: string
    avatar?: string
    firstname?: string
    lastname?: string
    auth_date: number
    hash: string
}
export interface SignInResponse {
    user: IUserInfo
}

export interface GetMeResponse {
    userInfo: IUserInfo
}