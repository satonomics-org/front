import * as twc from 'tailwindcss/colors'

export const convertCandleToColor = (candle: CandlestickData) =>
  (candle.close || 1) > (candle.open || 0) ? colors.up : colors.down

// const depreciatedColorNames = [
//   'lightBlue',
//   'warmGray',
//   'trueGray',
//   'coolGray',
//   'blueGray',
// ]

// depreciatedColorNames.forEach(
//   // @ts-ignore
//   (color) => delete twc[color],
// )

export const colors = {
  ...twc,
  black: '#000000',
  white: '#ffffff',
  crabs: twc.red[500],
  fish: twc.lime[500],
  humpbacks: twc.violet[500],
  plankton: twc.emerald[500],
  sharks: twc.teal[500],
  shrimps: twc.pink[500],
  whales: twc.blue[500],
  realized: twc.orange[500],
  oneMonth: twc.cyan[500],
  threeMonths: twc.lime[500],
  sth: twc.yellow[500],
  sixMonths: twc.red[500],
  oneYear: twc.pink[500],
  twoYears: twc.purple[500],
  lth: twc.fuchsia[500],
  balanced: twc.yellow[500],
  cvdd: twc.lime[500],
  terminal: twc.red[500],
  loss: twc.red[500],
  profit: twc.green[500],
  down: twc.red[500],
  up: twc.green[500],
}
