import { _decorator, CCString, Component, Label, Node, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SocialItemPrefab')
export class SocialItemPrefab extends Component {
    @property(Label) titleLabel: Label
    @property(Sprite) boxSprite: Sprite

    link: string
    init(title: string, link: string, sprite: SpriteFrame) {
        this.link = link
        this.titleLabel.string = title
        this.boxSprite.spriteFrame = sprite
    }

    onJoinClick() {
        window.open(this.link, "_blank")
    }

}

