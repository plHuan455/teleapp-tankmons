import { _decorator, Component, Enum } from 'cc';
import { BottomBarItem } from './BottomBarItem';
import { TAB_ITEM } from '../../Controllers/Preopen/ControlTab';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('BottomBarWrapper')
@executeInEditMode(true)
export class BottomBarWrapper extends Component {
    @property({type: Enum(TAB_ITEM)}) selectedTab: TAB_ITEM = TAB_ITEM.WHITE_LIST

    @property(BottomBarItem) whiteList: BottomBarItem
    @property(BottomBarItem) stacking: BottomBarItem
    @property(BottomBarItem) friends: BottomBarItem

    private tabData: {item: BottomBarItem, value: TAB_ITEM}[] = []
    private onChangeTabCB?: (tab: TAB_ITEM) => void

    protected start(): void {
        this.tabData = [
            {item: this.whiteList, value: TAB_ITEM.WHITE_LIST},
            {item: this.stacking, value: TAB_ITEM.STACKING},
            {item: this.friends, value: TAB_ITEM.FRIENDS},
        ]

        this.tabData.forEach((value => {
            value.item.init({
                onClick: () => {
                    this.selectedTab = value.value
                    this.onChangeTabCB(value.value)
                }
            })
        }))
    }

    init(params: {onChangeTab: (tab: TAB_ITEM) => void}) {
        this.onChangeTabCB = params.onChangeTab
    }

    protected update(): void {
        this.tabData.forEach(value => {
            value.item.isActive = value.value === this.selectedTab
        })
    }
}

