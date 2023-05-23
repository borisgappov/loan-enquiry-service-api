const constants = {
  GATEWAY_HOST: 'GATEWAY_HOST',
  GATEWAY_HTTP_PORT: 'GATEWAY_HTTP_PORT',
  LOANS_HOST: 'LOANS_HOST',
  LOANS_TCP_PORT: 'LOANS_TCP_PORT',
  LOANS_TCP_CLIENT: 'LOANS_TCP_PORT',
  DB_CONNECTION: 'DB_CONNECTION',
  DB_HOST: 'DB_HOST',
  DB_USERNAME: 'DB_USERNAME',
  DB_PASSWORD: 'DB_PASSWORD',
  DB_DATABASE: 'DB_DATABASE',
  DB_PORT: 'DB_PORT',
  DB_ENTITIES: 'DB_ENTITIES',
  DB_MIGRATIONS: 'DB_MIGRATIONS',
  DB_MIGRATIONS_RUN: 'DB_MIGRATIONS_RUN',
  DB_MIGRATIONS_DIR: 'DB_MIGRATIONS_DIR',
  LOCAL: '0.0.0.0',
  EX_HOST: 'EX_HOST',
  EX_TCP_PORT: 'EX_TCP_PORT',
  EX_OXR_URI: 'EX_OXR_URI',
  EX_OXR_APP_ID: 'EX_OXR_APP_ID',
  EX_BASE_CURRENCY: 'EX_BASE_CURRENCY',
  EXCHANGE_TCP_CLIENT: 'EXCHANGE_TCP_CLIENT',
  EX_CACHE_TIMEOUT: 'EX_CACHE_TIMEOUT',
};

export const {
  GATEWAY_HOST,
  GATEWAY_HTTP_PORT,
  LOANS_HOST,
  LOANS_TCP_PORT,
  LOANS_TCP_CLIENT,
  DB_CONNECTION,
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_PORT,
  DB_ENTITIES,
  DB_MIGRATIONS,
  DB_MIGRATIONS_RUN,
  DB_MIGRATIONS_DIR,
  LOCAL,
  EX_HOST,
  EX_TCP_PORT,
  EX_OXR_URI,
  EX_OXR_APP_ID,
  EX_BASE_CURRENCY,
  EXCHANGE_TCP_CLIENT,
  EX_CACHE_TIMEOUT,
} = constants;

export type Currency =
  | 'AED'
  | 'AFN'
  | 'ALL'
  | 'AMD'
  | 'ANG'
  | 'AOA'
  | 'ARS'
  | 'AUD'
  | 'AWG'
  | 'AZN'
  | 'BAM'
  | 'BBD'
  | 'BDT'
  | 'BGN'
  | 'BHD'
  | 'BIF'
  | 'BMD'
  | 'BND'
  | 'BOB'
  | 'BRL'
  | 'BSD'
  | 'BTC'
  | 'BTN'
  | 'BWP'
  | 'BYN'
  | 'BZD'
  | 'CAD'
  | 'CDF'
  | 'CHF'
  | 'CLF'
  | 'CLP'
  | 'CNH'
  | 'CNY'
  | 'COP'
  | 'CRC'
  | 'CUC'
  | 'CUP'
  | 'CVE'
  | 'CZK'
  | 'DJF'
  | 'DKK'
  | 'DOP'
  | 'DZD'
  | 'EGP'
  | 'ERN'
  | 'ETB'
  | 'EUR'
  | 'FJD'
  | 'FKP'
  | 'GBP'
  | 'GEL'
  | 'GGP'
  | 'GHS'
  | 'GIP'
  | 'GMD'
  | 'GNF'
  | 'GTQ'
  | 'GYD'
  | 'HKD'
  | 'HNL'
  | 'HRK'
  | 'HTG'
  | 'HUF'
  | 'IDR'
  | 'ILS'
  | 'IMP'
  | 'INR'
  | 'IQD'
  | 'IRR'
  | 'ISK'
  | 'JEP'
  | 'JMD'
  | 'JOD'
  | 'JPY'
  | 'KES'
  | 'KGS'
  | 'KHR'
  | 'KMF'
  | 'KPW'
  | 'KRW'
  | 'KWD'
  | 'KYD'
  | 'KZT'
  | 'LAK'
  | 'LBP'
  | 'LKR'
  | 'LRD'
  | 'LSL'
  | 'LYD'
  | 'MAD'
  | 'MDL'
  | 'MGA'
  | 'MKD'
  | 'MMK'
  | 'MNT'
  | 'MOP'
  | 'MRU'
  | 'MUR'
  | 'MVR'
  | 'MWK'
  | 'MXN'
  | 'MYR'
  | 'MZN'
  | 'NAD'
  | 'NGN'
  | 'NIO'
  | 'NOK'
  | 'NPR'
  | 'NZD'
  | 'OMR'
  | 'PAB'
  | 'PEN'
  | 'PGK'
  | 'PHP'
  | 'PKR'
  | 'PLN'
  | 'PYG'
  | 'QAR'
  | 'RON'
  | 'RSD'
  | 'RUB'
  | 'RWF'
  | 'SAR'
  | 'SBD'
  | 'SCR'
  | 'SDG'
  | 'SEK'
  | 'SGD'
  | 'SHP'
  | 'SLL'
  | 'SOS'
  | 'SRD'
  | 'SSP'
  | 'STD'
  | 'STN'
  | 'SVC'
  | 'SYP'
  | 'SZL'
  | 'THB'
  | 'TJS'
  | 'TMT'
  | 'TND'
  | 'TOP'
  | 'TRY'
  | 'TTD'
  | 'TWD'
  | 'TZS'
  | 'UAH'
  | 'UGX'
  | 'USD'
  | 'UYU'
  | 'UZS'
  | 'VES'
  | 'VND'
  | 'VUV'
  | 'WST'
  | 'XAF'
  | 'XAG'
  | 'XAU'
  | 'XCD'
  | 'XDR'
  | 'XOF'
  | 'XPD'
  | 'XPF'
  | 'XPT'
  | 'YER'
  | 'ZAR'
  | 'ZMW'
  | 'ZWL';
