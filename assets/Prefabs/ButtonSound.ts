import { _decorator, Component, AudioSource, Button } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ButtonSound')
export class ButtonSound extends Component {
    @property(AudioSource)
    audioSource: AudioSource = null;

    start() {
        const button = this.getComponent(Button);
        if (button && this.audioSource) {
            this.node.on(Button.EventType.CLICK, this.playSound, this);
        }
    }
    playSound() {
        this.audioSource.play();
    }
}
