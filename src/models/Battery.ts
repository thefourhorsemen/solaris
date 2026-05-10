export class Battery {
    capacity: number
    charge: number
    stored: number

    constructor(capacity: number) {
        this.capacity = capacity
        this.charge = 0
        this.stored = 0
    }

    // put the specified energy in battery up to its capacity
    // return the energy stored in the battery
    put(energy: number): number {
        if (this.charge < this.capacity) {
            const toStore = Math.min(this.capacity - this.charge, energy)
            this.charge += toStore
            this.stored += toStore
            return toStore
        }
        return 0;
    }

    // get the specified energy from battery down to 0
    // return the energy retrieved from the battery
    get(energy: number): number {
        if (this.charge > 0) {
            const toRelease = Math.min(this.charge, energy)
            this.charge -= toRelease
            return toRelease
        }
        return 0;
    }

    reset() {
        this.charge = 0
        this.stored = 0
    }
}
