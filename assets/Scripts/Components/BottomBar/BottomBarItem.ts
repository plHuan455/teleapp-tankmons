import { _decorator, CCBoolean, CCString, Component, Label, Sprite, SpriteFrame, UIOpacity } from 'cc';
const { property, ccclass, executeInEditMode } = _decorator;

@ccclass('BottomBarItem')
@executeInEditMode(true)
export class BottomBarItem extends Component {
    @property(Sprite) iconSprite: Sprite
    @property(Label) textLabel: Label
    @property(CCBoolean) isActive: boolean
    
    @property(CCString) text: string = ""
    @property(SpriteFrame) iconFrame: SpriteFrame
    

    onClickCB() {
    }

    update() {
        if(this.iconSprite) this.iconSprite.spriteFrame = this.iconFrame
        this.textLabel.string = this.text
        this.node.getComponent(UIOpacity).opacity = this.isActive ? 255 : 100
    }

    init(params: {onClick: () => void}) {
        this.onClickCB = params.onClick
    }
}

