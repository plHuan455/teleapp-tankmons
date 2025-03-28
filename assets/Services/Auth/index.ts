// import axiosInstance from "../../Libs/Axios/instance";
import axiosInstance from "../../Libs/Axios";
import { SignInParams } from "./types";

class AuthService {
   async signInService(params: SignInParams) {
    const res = await axiosInstance.method.post(
       '/signin', 
       {...params, auth_date: String(params.auth_date)}
     )

     return {
      user: res.data
     }
    }
}

const authService = new AuthService()
export default authService
