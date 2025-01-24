import { _decorator, CCString, Component, Node, UIOpacity, native } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CopyBox')
export class CopyBox extends Component {
    @property(UIOpacity) copy: UIOpacity
    @property(CCString) copyText: string = ""

    onClickCopy() {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(this.copyText)
            this.copy.opacity = 100
            this.scheduleOnce(() => {
                this.copy.opacity = 255
            }, 1)
            
        } else {
            console.error('Clipboard API is not supported on this browser.');
        }
    }

}

