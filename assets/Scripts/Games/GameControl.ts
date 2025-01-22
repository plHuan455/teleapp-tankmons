import { _decorator, Component, Enum, Node } from 'cc';
import { TabControl } from '../UI/TabControl';
import { TabContentControl } from './TabContentControl';
const { ccclass, property, executeInEditMode } = _decorator;

export enum TabValue {
    task = 'task',
    ranking = 'ranking',
    token = 'token',
    invite = 'invite'
}
@ccclass('GameControl')
@executeInEditMode(true) 
export class GameControl extends Component {
    @property(TabControl) tabControl: TabControl
    @property(TabContentControl) tabContentControl: TabContentControl

    @property({type: Enum(TabValue)}) tab: TabValue = TabValue.token

    protected start(): void {
        this.tabControl.init(this.onTabChange, this.tab)
        this.tabContentControl.init(this.tab)
    }

    private onTabChange = (tab: TabValue) => {
        this.tab = tab
        this.tabControl.updateActiveTab(this.tab)
        this.tabContentControl.displayContent(this.tab)
    }

    protected update(): void {
        this.onTabChange(this.tab)
    }
}

