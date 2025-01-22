import { _decorator, CCInteger, Component, Label, Node } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('CounTimeControl')
@executeInEditMode(true) 
export class CounTimeControl extends Component {
    @property(CCInteger) targetTimestamp: number = 0

    @property(Label) labelDay: Label
    @property(Label) labelHour: Label
    @property(Label) labelMinute: Label
    @property(Label) labelSecond: Label

    private convertSeconds(totalSeconds: number) {
        const days = Math.floor(totalSeconds / 86400); // Số ngày
        totalSeconds %= 86400; // Lấy phần dư còn lại
    
        const hours = Math.floor(totalSeconds / 3600); // Số giờ
        totalSeconds %= 3600; // Lấy phần dư còn lại
    
        const minutes = Math.floor(totalSeconds / 60); // Số phút
        const seconds = totalSeconds % 60; // Số giây còn lại
    
        return { days, hours, minutes, seconds };
    }

    protected start(): void {
        this.schedule(this.updateCountTime, 1);
    }

    private updateCountTime() {
        const remainSeconds = Math.round((this.targetTimestamp - Date.now()) / 1000)
        const {days, hours, minutes, seconds} = this.convertSeconds(Math.max(remainSeconds, 0))

        this.labelDay.string = `${days}D`
        this.labelHour.string = `${hours}H`
        this.labelMinute.string = `${minutes}M`
        this.labelSecond.string = `${seconds}S`
    }

    protected update(dt: number): void {
        this.updateCountTime()
    }
}

