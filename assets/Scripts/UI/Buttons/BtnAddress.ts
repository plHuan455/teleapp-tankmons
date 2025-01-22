import { _decorator, CCString, Component, Label, Node } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('BtnAddress')
@executeInEditMode(true) 

export class BtnAddress extends Component {
    @property(CCString) text: string = ""
    @property(Label) label: Label

    @property(Node) copyIcon: Node
    @property(Label) btnLabel: Label
    @property(CCString) btnText: string = ""

    onClick() {
        console.log(this.btnText);
        navigator.clipboard.writeText(this.btnText)
    }

    update() {
        this.label.string = this.text
        this.btnLabel.string = `${this.btnText.slice(0, 16)}...${this.btnText.slice(this.btnText.length - 7, this.btnText.length)}`
    }
}

