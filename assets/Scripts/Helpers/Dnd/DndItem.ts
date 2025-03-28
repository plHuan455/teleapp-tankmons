import { _decorator, Component, EventTouch, Node, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DndItem')
export class DndItem extends Component {
    private slotIndex: number = -1
    private isDragging: boolean = false;
    private startPosition: Vec3 = new Vec3();
    private onDropCallback?: (node: Node, startPs: Vec3, item: DndItem) => void
    private onDragStartCB?: (item: DndItem) => void

    private uiTransform?: UITransform

    public setSlotIndex(index: number) {
        this.slotIndex = index
    } 
    
    get SlotIndex() {
        return this.slotIndex
    }

    start() {
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        this.uiTransform = this.node.getComponent(UITransform)
    }

    private onTouchStart() {
        this.isDragging = true;
        this.startPosition.set(this.node.position);
        this.onDragStartCB(this)
        if(!this.uiTransform) return
        this.uiTransform.priority = 100
    }

    private onTouchMove(event: EventTouch) {
        if (!this.isDragging) return;
        const delta = event.getUIDelta();
        this.node.setPosition(this.node.position.x + delta.x, this.node.position.y + delta.y, 0);
    }

    private onTouchEnd(event: EventTouch) {
        this.isDragging = false
        this.onDropCallback(this.node, this.startPosition, this)
        this.uiTransform.priority = 1
    }

    init(onDrop: (node: Node, startPs: Vec3, item: DndItem) => void, onDragStart: (item: DndItem) => void) {
        this.onDropCallback = onDrop
        this.onDragStartCB = onDragStart
    }
}

