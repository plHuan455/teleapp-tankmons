import { _decorator, Component, Enum, Label, Node } from 'cc';
import { TabControl } from '../UI/TabControl';
import { TabContentControl } from './TabContentControl';
const { ccclass, property, executeInEditMode } = _decorator;

export enum TabValue {
    socials = 'socials',
    ranking = 'ranking',
    token = 'token',
    invite = 'invite'
}
@ccclass('GameControl')
@executeInEditMode(true) 
export class GameControl extends Component {
    @property(TabControl) tabControl: TabControl
    @property(TabContentControl) tabContentControl: TabContentControl
    @property(Label) myRankLabel: Label

    @property({type: Enum(TabValue)}) tab: TabValue = TabValue.token

    protected start(): void {
        this.tabControl.init(this.onTabChange, this.tab)
        this.tabContentControl.init(this.tab)

        this.init()
    }

    private init() {
        this.myRankLabel.string = `MY RANK - ${2}`
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

