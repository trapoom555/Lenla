import { InOutBlock, InOutDisplay } from "./block_behavior";
import { Number, Bool, Signal, Obj } from "./object";

export class ToDrag extends InOutDisplay {
    inValPorts: Array<Obj> = [null];//num,base 
    outValPorts: Array<Obj> = [null];//out value,position
    value: Obj
    displayDetail:any
    constructor(id: string, type: string) {
        super(id, type);
        this.displayDetail = {
            dragable:true,
            position:this.position
        }
    }
    addValPort(index: number, val: Obj) {
        this.inValPorts[index] = val
    }
    updateContent() {
        this.value = this.inValPorts[0];
        this.outValPorts[0].value = this.value
    }
    setDisplayDetail(detail: any): void {

        if (this.inValPorts[0] != null && this.inValPorts[0]) {
            console.log("port is not null")
            this.updateContent()
            this.displayDetail = {
                ...this.displayDetail,
                ...detail
            }
        }
        else {

            console.log("port is null")
            // this.displayDetail = {
            //     ...this.displayDetail,
            //     on_color: this.inValPorts[1].hex,
            //     off_color: this.inValPorts[2].hex,
            //     ...detail
            // }
            // console.log(this.displayDetail.off_color)
            // console.log(this.displayDetail.on_color)
        }
        this.position = this.displayDetail.position

    }

}
