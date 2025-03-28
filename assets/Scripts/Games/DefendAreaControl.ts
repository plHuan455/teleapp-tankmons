import { _decorator, Component, instantiate, Node, Prefab, Vec3 } from 'cc';
import { ITower } from '../../Services/Tower/types';
import { DndContainer } from '../Helpers/Dnd/DndContainer';
import { DndItem } from '../Helpers/Dnd/DndItem';
import { Tower } from '../Components/Tower';
const { ccclass, property } = _decorator;

function checkShootArea(slotIndex: number) {
    return slotIndex < 6
}
@ccclass('DefendAreaControl')
export class DefendAreaControl extends Component {
    @property(DndContainer) dndContainer: DndContainer
    @property(Prefab) towerPrefab: Prefab
    @property(Node) monsterRoadNode: Node
    @property(Prefab) bulletPrefab: Prefab

    private gunMap: Map<number, ITower> = new Map([
        [1, {level: 3, slot: 1}],
        [9, {level: 10, slot: 9}],
        [10, {level: 8, slot: 10}],
        [6, {level: 1, slot: 6}],
        [7, {level: 1, slot: 7}],
        [8, {level: 2, slot: 8}],
    ])

    private slotMap: Map<number, {item: DndItem; data: ITower}> = new Map()

    protected start(): void {
        this.gunMap.forEach(value => {
            const tower = instantiate(this.towerPrefab)
            const towerCmp = tower.getComponent(Tower)
            
            // Change level

            const dndItem = tower.addComponent(DndItem)
            
            dndItem.setSlotIndex(value.slot)
            this.node.addChild(tower)
            this.slotMap.set(value.slot, {item: dndItem, data: value})

            towerCmp.init(value.level, checkShootArea(value.slot), this.onFire)
        })
        this.dndContainer.init(this.onDrop, this.onDragStart)
    }

    private onFire = (tower: Tower) => {
        if (!this.bulletPrefab) return;

        // Tạo một viên đạn từ Prefab
        const bullet = instantiate(this.bulletPrefab);
        bullet.setPosition(new Vec3(-72.7, -178, 0))
        this.monsterRoadNode.addChild(bullet);
    }

    private onDragStart  = (item: DndItem) => {

    }

    private onDrop = (item: DndItem, destinationIndex: number) => {
        const desItem = this.slotMap.get(destinationIndex)
        const currItem = this.slotMap.get(item.SlotIndex)

        item.getComponent(Tower)?.shoot(checkShootArea(destinationIndex))
        // No change
        if(destinationIndex === item.SlotIndex) return true

        // No necessary merge
        if(!desItem || !currItem) {
            this.slotMap.delete(item.SlotIndex)
            this.slotMap.set(destinationIndex, currItem)
            return true
        }

        // Can't merge
        if(desItem.data.level !== currItem.data.level) {
            return false
        }


        this.slotMap.delete(item.SlotIndex)
        desItem.item.node.destroy()
        const level = currItem.item.getComponent(Tower)?.levelup()
        this.slotMap.set(destinationIndex, {...currItem, data: {...currItem.data, level}})
        return true
    }
}

