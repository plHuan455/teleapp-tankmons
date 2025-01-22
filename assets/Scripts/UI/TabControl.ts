import { _decorator, Component, Node } from 'cc';
import { Tab } from './Tab';
import { TabValue } from '../Games/GameControl';
const { ccclass, property } = _decorator;


@ccclass('TabControl')
export class TabControl extends Component {
    @property(Tab) task: Tab
    @property(Tab) ranking: Tab
    @property(Tab) token: Tab
    @property(Tab) invite: Tab

    private tabList: {value: TabValue, tab: Tab}[] = []
    private onClickCallback: (tab: TabValue) => void

    init(onClick: (tab: TabValue) => void, initialTab: TabValue) {
        this.onClickCallback = onClick

        this.tabList = [
            {tab: this.task, value: TabValue.task},
            {tab: this.ranking, value: TabValue.ranking},
            {tab: this.token, value: TabValue.token},
            {tab: this.invite, value: TabValue.invite},
        ]

        this.tabList.forEach(value => {
            value.tab.init(() => this.onClick(value.value), initialTab === value.value)
        })
    }

    updateActiveTab(tab: TabValue) {
        this.tabList.forEach(value => {
            value.tab.onChange(value.value === tab)
        })
    }

    protected start(): void {
    }

    private onClick = (tab: TabValue) => {
        this.onClickCallback(tab)
    }
}

