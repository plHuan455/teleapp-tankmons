import { _decorator, Component, Label } from 'cc';
import { IRank } from '../../Services/Ranking/types';
const { ccclass, property } = _decorator;

@ccclass('RankItem')
export class RankItem extends Component {
    @property(Label) labelTitle: Label;
    @property(Label) labelInvited: Label

    @property(Label) labelIndex: Label
    @property(Label) labelCoin: Label

    initData(rank: IRank) {
        this.labelTitle.string = rank.name
        this.labelCoin.string = String(rank.coin)
        this.labelInvited.string = `${rank.inviteCount} invited`
        this.labelIndex.string = String(rank.rank)
    }
}

