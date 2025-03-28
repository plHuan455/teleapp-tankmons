import { _decorator, CCInteger, Component, Label, Prefab, sp } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('Tower')
@executeInEditMode(true) 
export class Tower extends Component {
    @property(CCInteger) level: number = 1
    @property(Label) levelLabel: Label
    @property(Prefab) bulletPrefab: Prefab
    
    private isShooting: boolean = false
    private fireCb: (tower: Tower) => void
    private skeleton: sp.Skeleton

    start() {
        this.skeleton = this.node.getComponent(sp.Skeleton)
        this.skeleton.setCompleteListener((trackEntry: sp.spine.TrackEntry) => {
            if (trackEntry.animation.name === 'shoot') {
                this.fireCb(this)
            }
        });

        this.shoot(this.isShooting)
    }

    init(level: number, isShooting: boolean, fireCb: (tower: Tower) => void) {
        this.level = level
        this.changeLevel()
        this.shoot(isShooting)
        this.fireCb = fireCb
    }

    levelup() {
        this.level += 1
        this.changeLevel()
        return this.level
    }

    shoot(isShooting: boolean) {
        const skeleton = this.node.getComponent(sp.Skeleton)
        if(!skeleton) return
        if(isShooting) {
            skeleton.animation = 'shoot'
        }
        else {
            skeleton.animation = 'idle'
        }
    }
    
    private changeLevel() {
        if(!this.skeleton) return
        this.skeleton.setSkin(`lv${this.level}`) 
        this.levelLabel.string = String(this.level)
    }

    protected update(): void {
        this.changeLevel()
    }
}

