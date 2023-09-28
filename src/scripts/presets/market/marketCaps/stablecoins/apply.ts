import { applyDifferentLinesPreset, colors } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) =>
  applyDifferentLinesPreset({
    chart,
    priceScaleOptions: {
      halved: true,
    },
    list: [
      {
        dataset: datasets.stablecoinsMarketCap,
        title: 'Combined',
        color: colors.white(),
      },
      {
        dataset: datasets.usdtMarketCap,
        title: 'USDT',
        color: colors.usdt,
      },
      {
        dataset: datasets.usdcMarketCap,
        title: 'USDC',
        color: colors.usdc,
      },
      {
        dataset: datasets.daiMarketCap,
        title: 'DAI',
        color: colors.dai,
      },
      {
        dataset: datasets.busdMarketCap,
        title: 'BUSD',
        color: colors.busd,
      },
      {
        dataset: datasets.usddMarketCap,
        title: 'USDD',
        color: colors.usdd,
      },
      {
        dataset: datasets.fraxMarketCap,
        title: 'FRAX',
        color: colors.frax,
      },
      {
        dataset: datasets.ustMarketCap,
        title: 'UST',
        color: colors.ust,
      },
      {
        dataset: datasets.tusdMarketCap,
        title: 'TUSD',
        color: colors.tusd,
      },
      {
        dataset: datasets.pyusdMarketCap,
        title: 'PYUSD',
        color: colors.pyusd,
      },
    ],
  })
