import { _decorator, Component, instantiate, Label, Node, Prefab } from 'cc';
import { TowerItem } from './TowerItem';
const { ccclass, property, executeInEditMode } = _decorator;


type ItemTypes = {
    type: 'tower',
    data: {
        level: number
    }
}
@ccclass('ShopGroup')
@executeInEditMode(true) 
export class ShopGroup extends Component {
    @property(Label) titleLabel: Label
    @property(Node) listNode: Node

    @property(Prefab) towerPrefab: Prefab

    private _title: string = ""
    @property get title(): string {
        return this._title
    }
    set title(value: string) {
        this._title = value
        this.titleLabel.string = value
    }

    createItems(params: ItemTypes[]) {
        params.forEach(value => {
            switch(value.type) {
                case 'tower': {
                    const item = instantiate(this.towerPrefab).getComponent(TowerItem)
                    item.name = `Tank Level ${value.data.level} Pro max`
                    item.level = value.data.level        
                    this.listNode.addChild(item.node)
                    break;
                }
                default: {
                    break;
                }
            }

        })
    }

}

