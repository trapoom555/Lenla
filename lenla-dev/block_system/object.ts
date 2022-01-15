export class Obj {
    value: any
}
class Int extends Obj {
    value: Int
}
export class Bool extends Obj {
    value: boolean
    constructor(val: boolean = null) {
        super()
        if (val != null) this.value = val
    }
}
export class String extends Obj {
    value: string
    constructor(val: string = null) {
        super()
        if (val != null) this.value = val
    }
}
export class Number extends Obj {
    value: number
    constructor(val: any = null) {
        super()
        if (val instanceof Bool) {
            this.value = val.value ? 1 : 0
        }
        else if (typeof val == "number") {
            this.value = val
        }
        else {
            //arise error
        }
    }
    // constructor(val: number = null) {
    //     super()
    //     if (val != null) this.value = val
    // }

}
export class Color extends Obj {
    hex: string
    constructor(val: string = null) {
        super()
        if (val != null) this.hex = val
    }
    getRGB() {

    }


}
export class Signal extends Obj {
    state: boolean = false
    lastState: boolean
    risingCallback: Array<Function> = []
    rNullIndex: Array<number> = []
    fNullIndex: Array<number> = []
    fallingCallback: Array<Function> = []
    setState(newState: boolean) {
        this.lastState = this.state
        this.state = newState
        if (this.lastState == false && this.state == true) {
            this.risingCallback.forEach(fnc => {
                fnc();
            });
        }
        if (this.lastState == true && this.state == false) {
            this.fallingCallback.forEach(fnc => {
                fnc();
            });
        }
    }
    addRisingCallback(fnc: Function) {
        if (this.rNullIndex != []) {
            const index = this.rNullIndex.pop()
            this.risingCallback[index] = fnc
            return index
        }
        this.risingCallback.push(fnc)
        return this.risingCallback.length - 1
    }

    addFallingCallback(fnc: Function) {
        if (this.fNullIndex != []) {
            const index = this.fNullIndex.pop()
            this.fallingCallback[index] = fnc
            return index
        }
        this.fallingCallback.push(fnc)
        return this.fallingCallback.length - 1
    }

    removeRisingCallback(index: number) {
        this.risingCallback[index] = null
        this.rNullIndex.push(index)
    }
}
export class Vector2d extends Obj {
    x: number
    y: number
    constructor(x, y) {
        super();
        this.x = x
        this.y = y
    }

}