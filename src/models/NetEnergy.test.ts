import {DateNetEnergy, NetEnergy} from "./NetEnergy";

test('to', () => {
  const date = new Date("2022-08-14T16:15:00.000Z")
  const energy = new DateNetEnergy(date, new NetEnergy(266, 645, 0, 379))
  const actual = energy.to()
  expect(actual).toEqual([date, 266, -645, -0, 379])
})
