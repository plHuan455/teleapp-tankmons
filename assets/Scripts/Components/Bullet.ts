import { _decorator, Component, Node, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {
    speed: number = 100;
    private screenHeight: number
    start() {
        this.screenHeight = view.getVisibleSize().height;
    }

    update(dt: number) {
        const ps = this.node.getPosition().clone()
        ps.y += this.speed * dt


        this.node.setPosition(ps);
        if (this.node.getWorldPosition().y > this.screenHeight) {
            console.log('destroy');
            this.node.destroy();
        }
    }
}

