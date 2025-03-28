import { _decorator, CCFloat, CCInteger, CCString, Component, Enum, Node } from 'cc';
import { BottomBarItem } from '../../Components/BottomBar/BottomBarItem';
const { ccclass, property, executeInEditMode } = _decorator;


export enum TAB_ITEM {
    WHITE_LIST = 'white-list',
    STACKING = 'stacking',
    FRIENDS = 'friends',
    SHOP = 'shop'
}


@ccclass('ControlTab')
@executeInEditMode(true)
export class ControlTab extends Component {
    @property(BottomBarItem) whiteList: BottomBarItem
    @property(BottomBarItem) stacking: BottomBarItem
    @property(BottomBarItem) friends: BottomBarItem
    @property(BottomBarItem) shop: BottomBarItem
    @property(Node) whiteListNode: Node
    @property(Node) stackingNode: Node
    @property(Node) friendsNode: Node
    @property(Node) shopNode: Node

    private _selectedTab = TAB_ITEM.WHITE_LIST
    @property({type: Enum(TAB_ITEM)}) get selectedTab(): TAB_ITEM {
        return this._selectedTab
    }
    set selectedTab(value: TAB_ITEM) {
        this.updateTab(value)
    } 


    private tabData: {item: BottomBarItem, value: TAB_ITEM, node: Node}[] = []
    private onChangeTabCB?: (tab: TAB_ITEM) => void

    protected start(): void {
        this.tabData = [
            {item: this.whiteList, value: TAB_ITEM.WHITE_LIST, node: this.whiteListNode},
            {item: this.stacking, value: TAB_ITEM.STACKING, node: this.stackingNode},
            {item: this.friends, value: TAB_ITEM.FRIENDS, node: this.friendsNode},
            {item: this.shop, value: TAB_ITEM.SHOP, node: this.shopNode},
        ]

        this.tabData.forEach((value => {
            value.item.init({
                onClick: () => {
                    this.updateTab(value.value)
                    this.onChangeTabCB?.(value.value)
                }
            })
        }))

        this.updateTab(this._selectedTab)
    }

    init(params: {onChangeTab: (tab: TAB_ITEM) => void}) {
        this.onChangeTabCB = params.onChangeTab
    }

    updateTab(tab: TAB_ITEM) {
        this._selectedTab = tab
        this.tabData.forEach(value => {
            if(value.item) {
                value.item.isActive = value.node.active = value.value === this.selectedTab
            }
        })
    }
}

