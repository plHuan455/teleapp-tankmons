import { _decorator, CCInteger, CCString, Component, instantiate, Node, Prefab } from 'cc';
import { ShopGroup } from '../../Prefabs/Shop/ShopGroup';
const { ccclass, property } = _decorator;

@ccclass('Group')
class Group {
    @property(CCInteger) level: number = 1
}

@ccclass('ControlShop')
export class ControlShop extends Component {
    @property(Node) parentNode: Node
    @property(Prefab) shopGroupPrefab: Prefab


    // FOR DEV
    private _shopGroups: Group[] = []
    @property([Group]) get shopGroup() {
        return this._shopGroups
    }
    set shopGroup(groups: Group[]) {
        this._shopGroups = groups
        this.parentNode.removeAllChildren()
        groups.forEach((value) => {
            const tankShopGroup = instantiate(this.shopGroupPrefab).getComponent(ShopGroup)
            tankShopGroup.title = `Buy tanks ${value.level}`
            this.parentNode.addChild(tankShopGroup.node)
            tankShopGroup.node.getComponent(ShopGroup).createItems([
                {type: 'tower', data: {level: 1}},
                {type: 'tower', data: {level: 2}},
                {type: 'tower', data: {level: 3}},
                {type: 'tower', data: {level: 4}},
                {type: 'tower', data: {level: 5}},
            ])})
    }

    
    start() {
        Array(12).fill('').forEach((value, index) => {
            const tankShopGroup = instantiate(this.shopGroupPrefab).getComponent(ShopGroup)
            tankShopGroup.title = `Buy tanks ${index}`
            this.parentNode.addChild(tankShopGroup.node)
            tankShopGroup.node.getComponent(ShopGroup).createItems([
                {type: 'tower', data: {level: 1}},
                {type: 'tower', data: {level: 2}},
                {type: 'tower', data: {level: 3}},
                {type: 'tower', data: {level: 4}},
                {type: 'tower', data: {level: 5}},
            ])
        })
    }
}

