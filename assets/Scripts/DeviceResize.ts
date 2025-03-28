import { _decorator, Component, screen, UITransform } from 'cc';
const { ccclass } = _decorator;

@ccclass('DeviceResize')
export class DeviceResize extends Component {
    
    protected onLoad(): void {
        const uiTransform = this.node.getComponent(UITransform)
        if(!uiTransform) return
        const canvasRatio = 376 / 660
        let screenSize = screen.windowSize
        const screenRatio = screenSize.width / screenSize.height
        this.node.setScale(screenRatio / canvasRatio, 1)
    }
}

