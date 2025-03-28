import { _decorator, CCInteger, CCString, Component, Label, Node } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('FriendItemScript')
@executeInEditMode(true) 
export class FriendItemScript extends Component {
    @property(CCString) friendName: string = ""
    @property(Label) nameLabel: Label

    @property(CCInteger) tokenCont: number = 0
    @property(Label) tokenLabel: Label

    update() {
        this.nameLabel.string = this.friendName
        this.tokenLabel.string = `${this.tokenCont}$TANK`            
    }
}

