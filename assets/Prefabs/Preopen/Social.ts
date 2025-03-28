import { _decorator, CCString, Component, Label, Node, Sprite, SpriteFrame } from 'cc';
const { ccclass, executeInEditMode, property } = _decorator;

@ccclass('Social')
@executeInEditMode(true) 
export class Social extends Component {
    @property(Label) textLabel: Label
    @property(CCString) text: string = ""
    @property(Sprite) iconSprite: Sprite
    @property(SpriteFrame) spriteFrame: SpriteFrame
    @property(Sprite) iconBoxSprite: Sprite
    @property(SpriteFrame) iconBoxSpriteFrame: SpriteFrame
    @property(CCString) copyText: string  = ""

    onJoinClick() {
        console.log(this.copyText);
    }

    update() {
        this.textLabel.string = this.text
        this.iconSprite.spriteFrame = this.spriteFrame
        this.iconBoxSprite.spriteFrame = this.iconBoxSpriteFrame
    }
}

