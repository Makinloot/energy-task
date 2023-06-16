class Ship {
  constructor(name, length) {
    this.name = name
    this.length = length
  }
}

const smallShip = new Ship('small-one', 2)
const smallShip2 = new Ship('small-two', 2)
const bigShip = new Ship('big-one', 4)
const bigShip2 = new Ship('big-two', 4)

const ships = [
  smallShip,
  smallShip2,
  bigShip,
  bigShip2
]

export default ships