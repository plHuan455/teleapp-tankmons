import { _decorator, CCBoolean, Component, Label, Node, UIOpacity } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Tab')
export class Tab extends Component {
    @property(CCBoolean) isActive: boolean = false
    @property(Node) labelNode: Node
    @property(Node) borderNode: Node
    
    private onClickCallback: () => void

    protected start(): void {
        this.node.on(Node.EventType.TOUCH_END, this.onClick, this);
    }

    init(onClick: () => void, isActive?: boolean) {
        this.onClickCallback = onClick
        this.onChange(isActive)
    }
    private onClick(){
        this.onClickCallback()
    }

    onChange(active: boolean) {
        if(active) {
            this.node.getComponent(UIOpacity).enabled = false
            this.borderNode.active = true
            return
        }

        this.node.getComponent(UIOpacity).enabled = true
        this.borderNode.active = false

    }
}

