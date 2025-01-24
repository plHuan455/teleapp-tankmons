import { _decorator, CCString, Component, Label, Node } from 'cc';
import { abbreviateNumber } from 'db://assets/Utils/string';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('LabelCoin')
@executeInEditMode(true) 
export class LabelCoin extends Component {
    @property(Label) label: Label
    @property(CCString) coin: string = "0"

    updateCoin(newCoin: string) {
        const coin = Number(this.coin)
        if(isNaN(coin)) {
            this.label.string = newCoin
            return 
        }
        this.label.string = abbreviateNumber(coin)
    }

    protected update(): void {
        this.updateCoin(this.coin)
    }

}

