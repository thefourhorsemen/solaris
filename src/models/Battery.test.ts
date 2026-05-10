import {Battery} from "./Battery";

test('put in empty battery', () => {
    const battery = new Battery(5000)

    const energy = 25
    const actual = battery.put(energy)
    expect(actual).toEqual(25)
})

test('put in almost full battery', () => {
    const battery = new Battery(5000)
    battery.put(4950)

    const energy = 75
    const actual = battery.put(energy)
    expect(actual).toEqual(50)
})

test('put in full battery', () => {
    const battery = new Battery(5000)
    battery.put(5000)

    const energy = 75
    const actual = battery.put(energy)
    expect(actual).toEqual(0)
})

test('get from empty battery', () => {
    const battery = new Battery(5000)

    const energy = 25
    const actual = battery.get(energy)
    expect(actual).toEqual(0)
})

test('get from almost empty battery', () => {
    const battery = new Battery(5000)
    battery.put(50)

    const energy = 75
    const actual = battery.get(energy)
    expect(actual).toEqual(50)
})

test('get from full battery', () => {
    const battery = new Battery(5000)
    battery.put(5000)

    const energy = 75
    const actual = battery.get(energy)
    expect(actual).toEqual(75)
})
