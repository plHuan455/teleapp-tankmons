import { _decorator, Component, Node } from 'cc';
import { TabValue } from './GameControl';
const { ccclass, property } = _decorator;

@ccclass('TabContentControl')
export class TabContentControl extends Component {
    @property(Node) tokenNode: Node
    @property(Node) rankNode: Node
    @property(Node) socialNode: Node
    @property(Node) inviteNode: Node

    private tabList: {node: Node; value: TabValue}[] = []

    init(initialTab: TabValue) {
        this.tabList = [
            {node: this.tokenNode, value: TabValue.token},
            {node: this.rankNode, value: TabValue.ranking},
            {node: this.socialNode, value: TabValue.socials},
            {node: this.inviteNode, value: TabValue.invite},
        ]

        this.displayContent(initialTab)
    }

    displayContent(tab: TabValue) {
        this.tabList.forEach(value => {
            value.node.active = value.value === tab
        })
    }
}

