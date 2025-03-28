import { IUserInfo } from "../Services/Auth/types"

class AuthStore {
  isLoading: boolean = true
  isLogged: boolean = false
  user?: IUserInfo = undefined
  token?: string

  public logged(user: IUserInfo) {
    if(!user) {
      this.isLoading = false
      this.isLogged = false
      this.user = undefined
      return
    }

    this.user = user
    this.isLogged = true
    this.isLoading = false
    this.token = user.access_token
  }

  updateCoin(coin: number | ((preCoin: number) => number)) {
    if(!this.user) return
    if(typeof coin === 'function') {
      return this.user.coin = coin(this.user.coin) 
    }
    return this.user.coin = coin
  }
  getCoin() {
    return this.user?.coin ?? 0
  }
}

export const authStore =  new AuthStore()
