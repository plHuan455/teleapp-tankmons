import { _decorator, Component, director } from 'cc';
import { TelegramWebApp } from 'db://assets/cocos-telegram-miniapps/scripts/telegram-web';
import ENV_DATA from 'db://assets/Constants/envs';
import axiosInstance from 'db://assets/Libs/Axios';
import authService from 'db://assets/Services/Auth';
import { authStore } from 'db://assets/Store/auth';
const { ccclass } = _decorator;

@ccclass('LoadControl')
export class LoadControl extends Component {
    private isFetchDone: boolean = false
    private isLoadSceneDone: boolean = false

    async start() {
        try {
            this.loadScene()
            await TelegramWebApp.Instance.init()
            const userInfo = TelegramWebApp.Instance.getTelegramWebAppInitData()
            await axiosInstance.init()
            const data = await authService.signInService(userInfo.user ? {
                avatar: userInfo.user.photo_url,
                telegram_id: userInfo.user.id,
                username: userInfo.user.username,
                firstname: userInfo.user.first_name,
                lastname: userInfo.user.last_name,
                auth_date: userInfo.auth_data,
                hash: userInfo.hash
            } : ENV_DATA.AUTH_DATA)
            authStore.logged(data.user)

            this.isFetchDone = true
            if (this.isLoadSceneDone) {
                this.openScene()
            }
        } catch(err) {
            console.log(err);
        }
        
    }



    private loadScene() {
        director.preloadScene(
            'scene',
            (completeCount: number, totalCount: number) => {
            },
            () => {
                this.isLoadSceneDone = true
                if (this.isFetchDone) {
                    this.openScene()
                }
            }
        )
    }

    private openScene = () => {
        director.loadScene('Preopen2')
    }
}

