import { _decorator, CCString, Component, Label, Node, Sprite, SpriteFrame } from 'cc';
import { SocialItemPrefab } from './SocialItemPrefab';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('SocialItem')
@executeInEditMode(true) 
export class SocialItem extends Component {
    @property(CCString) titleText: string = ""
    @property(SpriteFrame) spriteFrame: SpriteFrame
    @property(CCString) link: string = ""

    protected update(dt: number): void {
        const socialItemPrefabScript = this.node.getComponent(SocialItemPrefab)
        if(!socialItemPrefabScript) return
        socialItemPrefabScript.init(this.titleText, this.link, this.spriteFrame)
    }

}

