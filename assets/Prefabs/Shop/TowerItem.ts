import { _decorator, CCFloat, CCString, Component, Label, Node, Prefab } from 'cc';
import { Tower } from '../../Scripts/Components/Tower';
const { ccclass, property } = _decorator;

@ccclass('TowerItem')
export class TowerItem extends Component {
    @property(Label) nameLabel: Label
    @property(Label) priceLabel: Label
    @property(Tower) tower: Tower

    private _itemName: string = ''
    @property get name(): string {
        return this._itemName
    }
    set name(value: string) {
        this._itemName = value
        this.nameLabel.string = this._itemName
    }

    private _level: number
    @property get level(): number {
        return this._level
    }
    set level(value: number) {
        this.tower.level = value
        this._level = value
    }

    private _price: number = 0
    @property get price(): number {
        return this._price
    }
    set price(value: number) {
        this._price = value
        this.priceLabel.string = `${this._price} TON`
    }

}