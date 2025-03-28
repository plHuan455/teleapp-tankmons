enum EnvType {
  production = 'production',
  staging = 'staging'
}

/** SET ENV HERE */
export const ENV = EnvType.staging

const ENVS_LIST = {
  [EnvType.staging]: {
    API_DOMAIN: 'https://stg-api.tankmons.io',
    TOKEN: 'MONS',
    AUTH_DATA: {
      "telegram_id": 5733473003,
      "username": "plhuan",
      "avatar": "https://t.me/i/userpic/320/XjfwTZr4-G9Xaeoe8w-2kTRXMsYoYCj4QG3G84FOMJ34ymh1KgsvX12vOrleu2c0.svg",
      "firstname": "Counter",
      "lastname": "Tele",
      "auth_date": 1734843944,
      "hash": "f688ac27485ee137624c767160ef938a90689479d1d104be8eae5455fe3b336d"
    }
  }
}


const ENV_DATA = ENVS_LIST[ENV]

export default ENV_DATA
