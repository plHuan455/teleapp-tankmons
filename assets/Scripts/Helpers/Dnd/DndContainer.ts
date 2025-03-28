import { _decorator, Component, Node, Vec3 } from 'cc';
import { DndItem } from './DndItem';
const { ccclass, property } = _decorator;

type FnDropCallbackType = (item: DndItem, destinationIndex: number) => boolean

@ccclass('DndContainer')
export class DndContainer extends Component {
    @property([Node]) slots: Node[] = []

    // if return true ? allow drop : no drop
    private onDropCallback: FnDropCallbackType

    private onDrop = (node: Node, startPos: Vec3, item: DndItem) => {
        let closestSlotIndex = this.getClosestSlot(node);
        const allowDrop = this.onDropCallback?.(item, closestSlotIndex) ?? true
        if (closestSlotIndex !== -1 && allowDrop) {
            node.setPosition(this.slots[closestSlotIndex].position); // Snap vào vị trí gần nhất
            node.getComponent(DndItem)?.setSlotIndex(closestSlotIndex) // Update slot index
         } else {
            node.setPosition(startPos); // Trả về vị trí cũ nếu không có slot nào gần
        }
    }

    init(onDropCallback: FnDropCallbackType, onDragCb: (item: DndItem) => void) {
        this.onDropCallback = onDropCallback
        this.node.children.forEach((value, index) => {
            const dndItem = value.getComponent(DndItem)
            if(!dndItem) return
            dndItem.init(this.onDrop, onDragCb)

            const slot = this.slots[dndItem.SlotIndex]
            if(!slot) return
            value.setPosition(slot.position)
        })
    }

    getClosestSlot(node: Node): number {
        let minDist = Infinity;
        let closestIndex: number = -1
        let itemPos = node.worldPosition;

        this.slots.forEach((slot, index) => {
            let dist = Vec3.distance(itemPos, slot.worldPosition);
            if (dist < minDist) {
                minDist = dist;
                closestIndex = index;
            }
        });

        return closestIndex;
    }
}

