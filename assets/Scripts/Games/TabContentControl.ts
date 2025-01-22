import { _decorator, Component, Node } from 'cc';
import { TabValue } from './GameControl';
const { ccclass, property } = _decorator;

@ccclass('TabContentControl')
export class TabContentControl extends Component {
    @property(Node) tokenNode: Node

    private tabList: {node: Node; value: TabValue}[] = []

    init(initialTab: TabValue) {
        this.tabList = [
            {node: this.tokenNode, value: TabValue.token},
        ]

        this.displayContent(initialTab)
    }

    displayContent(tab: TabValue) {
        this.tabList.forEach(value => {
            value.node.active = value.value === tab
        })
    }
}

