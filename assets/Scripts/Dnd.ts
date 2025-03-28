import { _decorator, Component, EventTouch, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DndContainer')
export class DndContainer extends Component {
    @property([Node]) slots: Node[] = []

    protected start(): void {
        
    }
}

