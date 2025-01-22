import { _decorator, CCString, Component, Label, Node } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('BtnToken')
@executeInEditMode(true) 
export class BtnToken extends Component {
    @property(CCString) text: string = ""
    @property(Label) label: Label

    @property(Label) labelBtn: Label
    @property(CCString) textBtn: string = ""
    
    update() {
        this.label.string = this.text
        this.labelBtn.string = this.textBtn
    }
}

