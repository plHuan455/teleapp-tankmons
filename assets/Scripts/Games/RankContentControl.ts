import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import { listRankService } from '../../Services/Ranking';
import { IRank } from '../../Services/Ranking/types';
import { RankItem } from '../Components/RankItem';
const { ccclass, property } = _decorator;

@ccclass('RankContentControl')
export class RankContentControl extends Component {
    @property(Node) contentNode: Node
    @property(Prefab) rankPrefab: Prefab

    protected async onEnable() {
        const res = await listRankService()
        this.createRankItem(res.ranks)
    }

    private createRankItem(ranks: IRank[]) {
        this.contentNode.removeAllChildren()
        ranks.forEach(value => {
            const rankItemNode = instantiate(this.rankPrefab) 
            const script = rankItemNode.getComponent(RankItem)
            this.contentNode.addChild(rankItemNode)
            if(!script) return
            script.initData(value)
        })
    }
}

