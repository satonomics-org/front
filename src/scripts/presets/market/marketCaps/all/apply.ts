import { PriceScaleMode } from 'lightweight-charts'

import { applyDifferentLinesPreset, colors } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) =>
  applyDifferentLinesPreset({
    chart,
    priceScaleOptions: {
      halved: true,
      mode: PriceScaleMode.Logarithmic,
    },
    list: [
      {
        dataset: datasets.totalMarketCap,
        title: 'Total',
        color: colors.white(),
      },
      {
        dataset: datasets.bitcoinMarketCap,
        title: 'Bitcoin',
        color: colors.bitcoin,
      },
      {
        dataset: datasets.ethereumMarketCap,
        title: 'Ethereum',
        color: colors.ethereum,
      },
      {
        dataset: datasets.stablecoinsMarketCap,
        title: 'Stablecoins',
        color: colors.usdt,
      },
      {
        dataset: datasets.altcoinsMarketCap,
        title: 'TOT - BTC',
        color: colors.gray[500],
      },
    ],
  })
