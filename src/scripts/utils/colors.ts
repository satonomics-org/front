import {
  ColorSpace,
  Lab,
  mix,
  OKLCH,
  parse,
  serialize,
  sRGB,
  steps,
  to,
} from 'colorjs.io/fn'
import { type ColorTypes } from 'colorjs.io/types/src/color'
import * as twc from 'tailwindcss/colors'

ColorSpace.register(sRGB)
ColorSpace.register(Lab)
ColorSpace.register(OKLCH)

export const convertCandleToColor = (candle: DatedCandlestickData) =>
  (candle.close || 1) > (candle.open || 0) ? colors.up : colors.down

export const mixColors = (
  color1: string,
  color2: string,
  percentage?: number,
) =>
  colorToHex(
    mix(parse(color1), parse(color2), percentage || 0.5, {
      space: 'oklch',
    }),
  )

export const darken = (color: string, percentage?: number) =>
  mixColors(color, colors.black, percentage)

export const stepColors = (color1: string, color2: string, _steps = 10) =>
  steps(parse(color1), parse(color2), {
    space: 'oklch',
    steps: _steps,
  }).map((color) => colorToHex(color))

export const colors = {
  ...twc,
  black: '#000000',
  white: () =>
    document.body.classList.contains('dark') ? '#ffffffcd' : '#ffffff',
  offWhite: () =>
    document.body.classList.contains('dark') ? '#ffffff66' : '#ffffff88',
  weeklyMA: twc.yellow[500],
  monthlyMA: twc.orange[500],
  yearlyMA: twc.red[500],
  crabs: twc.red[500],
  fish: twc.lime[500],
  humpbacks: twc.violet[500],
  plankton: twc.emerald[500],
  sharks: twc.cyan[500],
  shrimps: twc.pink[500],
  whales: twc.blue[500],
  realizedPrice: twc.orange[500],
  oneMonthHolders: twc.cyan[500],
  threeMonthsHolders: twc.lime[500],
  sth: twc.yellow[500],
  sixMonthsHolder: twc.red[500],
  oneYearHolders: twc.pink[500],
  twoYearsHolders: twc.purple[500],
  lth: twc.fuchsia[500],
  balancedPrice: twc.yellow[500],
  cointimePrice: twc.yellow[500],
  trueMeanPrice: twc.blue[500],
  vaultedPrice: twc.green[500],
  cvdd: twc.lime[500],
  terminalPrice: twc.red[500],
  loss: twc.red[500],
  profit: twc.green[500],
  down: twc.red[500],
  up: twc.green[500],
}

const colorToHex = (color: ColorTypes | number) =>
  serialize(to(typeof color === 'number' ? String(color) : color, 'srgb'), {
    format: 'hex',
  })
