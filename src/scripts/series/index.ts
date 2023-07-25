import { create2YRealizedPriceSeries } from './2y'
import { createAgedRealizedPricesSeries } from './aged'
import { createBalancedPriceSeries } from './balanced'
import { createCVDDSeries } from './cvdd'
import {
  createEntitiesRealizedPricesSeries,
  createHumpbacksRealizedPriceSeries,
  createSharksRealizedPriceSeries,
  createWhalesRealizedPriceSeries,
} from './entities'
import { createFundingRatesSeries } from './fundingRates'
import { createLTHRealizedPriceSeries } from './lth'
import { createMidPointPriceSeries } from './midPoint'
import { createNetRealizedProfitAndLossSeries } from './netPNL'
import { createRealizedPriceSeries } from './realized'
import { createSOPRSeries } from './sopr'
import { createSTHRealizedPriceSeries } from './sth'
import { createTerminalPriceSeries } from './terminal'
import { createVDDMultipleSeries } from './vdd'
import { createMarketVolumeSeries } from './volumes'

export const seriesGroups = [
  {
    name: 'Base',
    list: [
      {
        id: 'minimal',
        text: 'Minimal',
        creator: undefined,
      },
    ],
  },
  {
    name: 'Market',
    list: [
      {
        id: 'marketVolume',
        text: 'Market Volume',
        creator: createMarketVolumeSeries,
      },
    ],
  },
  {
    name: 'Hodlers',
    list: [
      {
        id: 'sth',
        text: 'Short Term Holders',
        creator: createSTHRealizedPriceSeries,
      },
      {
        id: '<2y',
        text: '<2Y Holders',
        creator: create2YRealizedPriceSeries,
      },
      {
        id: 'lth',
        text: 'Long Term holders',
        creator: createLTHRealizedPriceSeries,
      },
      {
        id: 'allHolders',
        text: 'All Holders',
        creator: createAgedRealizedPricesSeries,
      },
    ],
  },
  {
    name: 'Indicators',
    list: [
      {
        id: 'terminal',
        text: 'Terminal Price',
        creator: createTerminalPriceSeries,
      },
      {
        id: 'mid',
        text: 'Mid Point Price',
        creator: createMidPointPriceSeries,
      },
      {
        id: 'realized',
        text: 'Realized Price',
        creator: createRealizedPriceSeries,
      },
      {
        id: 'balanced',
        text: 'Balanced Price',
        creator: createBalancedPriceSeries,
      },
      {
        id: 'cvdd',
        text: 'CVDD Price',
        creator: createCVDDSeries,
      },
      {
        id: 'netP&L',
        text: 'Net Realized Profit & Loss',
        creator: createNetRealizedProfitAndLossSeries,
      },
      {
        id: 'sopr',
        text: 'SOPR',
        creator: createSOPRSeries,
      },
      {
        id: 'vdd',
        text: 'VDD Multiple',
        creator: createVDDMultipleSeries,
      },
    ],
  },
  {
    name: 'Entities',
    list: [
      {
        id: 'sharks',
        text: 'Sharks Realized Price',
        creator: createSharksRealizedPriceSeries,
      },
      {
        id: 'whales',
        text: 'Whales Realized Price',
        creator: createWhalesRealizedPriceSeries,
      },
      {
        id: 'humpbacks',
        text: 'Humpbacks Realized Price',
        creator: createHumpbacksRealizedPriceSeries,
      },
      {
        id: 'entities',
        text: 'All Entities',
        creator: createEntitiesRealizedPricesSeries,
      },
    ],
  },
  {
    name: 'Derivatives',
    list: [
      {
        id: 'fundRates',
        text: 'Funding rates',
        creator: createFundingRatesSeries,
      },
    ],
  },

  // {
  //   id: 'onChainVolume',
  //   text: 'On Chain Volume',
  //   onClick: createOnChainVolumeSeries,
  // },
  //
  // SUPPLY IN PROFIT
  //
  // SUPPLY IN LOSS
  //
]
