import { _decorator, CCString, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('InviteContentControl')
export class InviteContentControl extends Component {
    @property(CCString) shareLink: string = ""
    onShareClick() {
        console.log('SHARE LINK');
    }
}

