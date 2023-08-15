import _ from 'lodash';

export type Country = {
  name: string;
  countryCode: Alpha2Code;
  countryISOCode: Alpha3Code;
  dialCode: string;
  currency: string;
};

export const getCountry = (countryCode: Alpha2Code) => {
  return _.find(countries, { countryCode });
};

export const countries: Country[] = [
  {
    name: 'Afghanistan',
    countryCode: 'AF',
    countryISOCode: 'AFG',
    dialCode: '+93',
    currency: 'AFN'
  },
  {
    name: 'Aland Islands',
    countryCode: 'AX',
    countryISOCode: 'ALA',
    dialCode: '+358',
    currency: 'EUR'
  },
  {
    name: 'Albania',
    countryCode: 'AL',
    countryISOCode: 'ALB',
    dialCode: '+355',
    currency: 'ALL'
  },
  {
    name: 'Algeria',
    countryCode: 'DZ',
    countryISOCode: 'DZA',
    dialCode: '+213',
    currency: 'DZD'
  },
  {
    name: 'American Samoa',
    countryCode: 'AS',
    countryISOCode: 'ASM',
    dialCode: '+1684',
    currency: 'USD'
  },
  {
    name: 'Andorra',
    countryCode: 'AD',
    countryISOCode: 'AND',
    dialCode: '+376',
    currency: 'EUR'
  },
  {
    name: 'Angola',
    countryCode: 'AO',
    countryISOCode: 'AGO',
    dialCode: '+244',
    currency: 'AOA'
  },
  {
    name: 'Anguilla',
    countryCode: 'AI',
    countryISOCode: 'AIA',
    dialCode: '+1264',
    currency: 'XCD'
  },
  {
    name: 'Antarctica',
    countryCode: 'AQ',
    countryISOCode: 'ATA',
    dialCode: '+672',
    currency: ''
  },
  {
    name: 'Antigua and Barbuda',
    countryCode: 'AG',
    countryISOCode: 'ATG',
    dialCode: '+1268',
    currency: 'XCD'
  },
  {
    name: 'Argentina',
    countryCode: 'AR',
    countryISOCode: 'ARG',
    dialCode: '+54',
    currency: 'ARS'
  },
  {
    name: 'Armenia',
    countryCode: 'AM',
    countryISOCode: 'ARM',
    dialCode: '+374',
    currency: 'AMD'
  },
  {
    name: 'Aruba',
    countryCode: 'AW',
    countryISOCode: 'ABW',
    dialCode: '+297',
    currency: 'AWG'
  },
  {
    name: 'Australia',
    countryCode: 'AU',
    countryISOCode: 'AUS',
    dialCode: '+61',
    currency: 'AUD'
  },
  {
    name: 'Austria',
    countryCode: 'AT',
    countryISOCode: 'AUT',
    dialCode: '+43',
    currency: 'EUR'
  },
  {
    name: 'Azerbaijan',
    countryCode: 'AZ',
    countryISOCode: 'AZE',
    dialCode: '+994',
    currency: 'AZN'
  },
  {
    name: 'Bahamas',
    countryCode: 'BS',
    countryISOCode: 'BHS',
    dialCode: '+1242',
    currency: 'BSD'
  },
  {
    name: 'Bahrain',
    countryCode: 'BH',
    countryISOCode: 'BHR',
    dialCode: '+973',
    currency: 'BHD'
  },
  {
    name: 'Bangladesh',
    countryCode: 'BD',
    countryISOCode: 'BGD',
    dialCode: '+880',
    currency: 'BDT'
  },
  {
    name: 'Barbados',
    countryCode: 'BB',
    countryISOCode: 'BRB',
    dialCode: '+1246',
    currency: 'BBD'
  },
  {
    name: 'Belarus',
    countryCode: 'BY',
    countryISOCode: 'BLR',
    dialCode: '+375',
    currency: 'BYR'
  },
  {
    name: 'Belgium',
    countryCode: 'BE',
    countryISOCode: 'BEL',
    dialCode: '+32',
    currency: 'EUR'
  },
  {
    name: 'Belize',
    countryCode: 'BZ',
    countryISOCode: 'BLZ',
    dialCode: '+501',
    currency: 'BZD'
  },
  {
    name: 'Benin',
    countryCode: 'BJ',
    countryISOCode: 'BEN',
    dialCode: '+229',
    currency: 'XOF'
  },
  {
    name: 'Bermuda',
    countryCode: 'BM',
    countryISOCode: 'BMU',
    dialCode: '+1441',
    currency: 'BMD'
  },
  {
    name: 'Bhutan',
    countryCode: 'BT',
    countryISOCode: 'BTN',
    dialCode: '+975',
    currency: 'BTN'
  },
  {
    name: 'Bolivia',
    countryCode: 'BO',
    countryISOCode: 'BOL',
    dialCode: '+591',
    currency: 'BOB'
  },
  {
    name: 'Bonaire, Saint Eustatius and Saba ',
    countryCode: 'BQ',
    countryISOCode: 'BES',
    dialCode: '+599',
    currency: 'USD'
  },
  {
    name: 'Bosnia and Herzegovina',
    countryCode: 'BA',
    countryISOCode: 'BIH',
    dialCode: '+387',
    currency: 'BAM'
  },
  {
    name: 'Botswana',
    countryCode: 'BW',
    countryISOCode: 'BWA',
    dialCode: '+267',
    currency: 'BWP'
  },
  {
    name: 'Bouvet Island',
    countryCode: 'BV',
    countryISOCode: 'BVT',
    dialCode: '+55',
    currency: 'NOK'
  },
  {
    name: 'Brazil',
    countryCode: 'BR',
    countryISOCode: 'BRA',
    dialCode: '+55',
    currency: 'BRL'
  },
  {
    name: 'British Indian Ocean Territory',
    countryCode: 'IO',
    countryISOCode: 'IOT',
    dialCode: '+246',
    currency: 'USD'
  },
  {
    name: 'British Virgin Islands',
    countryCode: 'VG',
    countryISOCode: 'VGB',
    dialCode: '+1284',
    currency: 'USD'
  },
  {
    name: 'Brunei',
    countryCode: 'BN',
    countryISOCode: 'BRN',
    dialCode: '+673',
    currency: 'BND'
  },
  {
    name: 'Bulgaria',
    countryCode: 'BG',
    countryISOCode: 'BGR',
    dialCode: '+359',
    currency: 'BGN'
  },
  {
    name: 'Burkina Faso',
    countryCode: 'BF',
    countryISOCode: 'BFA',
    dialCode: '+226',
    currency: 'XOF'
  },
  {
    name: 'Burundi',
    countryCode: 'BI',
    countryISOCode: 'BDI',
    dialCode: '+257',
    currency: 'BIF'
  },
  {
    name: 'Cambodia',
    countryCode: 'KH',
    countryISOCode: 'KHM',
    dialCode: '+855',
    currency: 'KHR'
  },
  {
    name: 'Cameroon',
    countryCode: 'CM',
    countryISOCode: 'CMR',
    dialCode: '+237',
    currency: 'XAF'
  },
  {
    name: 'Canada',
    countryCode: 'CA',
    countryISOCode: 'CAN',
    dialCode: '+1',
    currency: 'CAD'
  },
  {
    name: 'Cape Verde',
    countryCode: 'CV',
    countryISOCode: 'CPV',
    dialCode: '+238',
    currency: 'CVE'
  },
  {
    name: 'Cayman Islands',
    countryCode: 'KY',
    countryISOCode: 'CYM',
    dialCode: '+1345',
    currency: 'KYD'
  },
  {
    name: 'Central African Republic',
    countryCode: 'CF',
    countryISOCode: 'CAF',
    dialCode: '+236',
    currency: 'XAF'
  },
  {
    name: 'Chad',
    countryCode: 'TD',
    countryISOCode: 'TCD',
    dialCode: '+235',
    currency: 'XAF'
  },
  {
    name: 'Chile',
    countryCode: 'CL',
    countryISOCode: 'CHL',
    dialCode: '+56',
    currency: 'CLP'
  },
  {
    name: 'China',
    countryCode: 'CN',
    countryISOCode: 'CHN',
    dialCode: '+86',
    currency: 'CNY'
  },
  {
    name: 'Christmas Island',
    countryCode: 'CX',
    countryISOCode: 'CXR',
    dialCode: '+61',
    currency: 'AUD'
  },
  {
    name: 'Cocos Islands',
    countryCode: 'CC',
    countryISOCode: 'CCK',
    dialCode: '+61',
    currency: 'AUD'
  },
  {
    name: 'Colombia',
    countryCode: 'CO',
    countryISOCode: 'COL',
    dialCode: '+57',
    currency: 'COP'
  },
  {
    name: 'Comoros',
    countryCode: 'KM',
    countryISOCode: 'COM',
    dialCode: '+269',
    currency: 'KMF'
  },
  {
    name: 'Cook Islands',
    countryCode: 'CK',
    countryISOCode: 'COK',
    dialCode: '+682',
    currency: 'NZD'
  },
  {
    name: 'Costa Rica',
    countryCode: 'CR',
    countryISOCode: 'CRI',
    dialCode: '+506',
    currency: 'CRC'
  },
  {
    name: 'Croatia',
    countryCode: 'HR',
    countryISOCode: 'HRV',
    dialCode: '+385',
    currency: 'HRK'
  },
  {
    name: 'Cuba',
    countryCode: 'CU',
    countryISOCode: 'CUB',
    dialCode: '+53',
    currency: 'CUP'
  },
  {
    name: 'Curacao',
    countryCode: 'CW',
    countryISOCode: 'CUW',
    dialCode: '+599',
    currency: 'ANG'
  },
  {
    name: 'Cyprus',
    countryCode: 'CY',
    countryISOCode: 'CYP',
    dialCode: '+357',
    currency: 'EUR'
  },
  {
    name: 'Czech Republic',
    countryCode: 'CZ',
    countryISOCode: 'CZE',
    dialCode: '+420',
    currency: 'CZK'
  },
  {
    name: 'Democratic Republic of the Congo',
    countryCode: 'CD',
    countryISOCode: 'COD',
    dialCode: '+243',
    currency: 'CDF'
  },
  {
    name: 'Denmark',
    countryCode: 'DK',
    countryISOCode: 'DNK',
    dialCode: '+45',
    currency: 'DKK'
  },
  {
    name: 'Djibouti',
    countryCode: 'DJ',
    countryISOCode: 'DJI',
    dialCode: '+253',
    currency: 'DJF'
  },
  {
    name: 'Dominica',
    countryCode: 'DM',
    countryISOCode: 'DMA',
    dialCode: '+1767',
    currency: 'XCD'
  },
  {
    name: 'Dominican Republic',
    countryCode: 'DO',
    countryISOCode: 'DOM',
    dialCode: '+1849',
    currency: 'DOP'
  },
  {
    name: 'East Timor',
    countryCode: 'TL',
    countryISOCode: 'TLS',
    dialCode: '+670',
    currency: 'USD'
  },
  {
    name: 'Ecuador',
    countryCode: 'EC',
    countryISOCode: 'ECU',
    dialCode: '+593',
    currency: 'USD'
  },
  {
    name: 'Egypt',
    countryCode: 'EG',
    countryISOCode: 'EGY',
    dialCode: '+20',
    currency: 'EGP'
  },
  {
    name: 'El Salvador',
    countryCode: 'SV',
    countryISOCode: 'SLV',
    dialCode: '+503',
    currency: 'USD'
  },
  {
    name: 'Equatorial Guinea',
    countryCode: 'GQ',
    countryISOCode: 'GNQ',
    dialCode: '+240',
    currency: 'XAF'
  },
  {
    name: 'Eritrea',
    countryCode: 'ER',
    countryISOCode: 'ERI',
    dialCode: '+291',
    currency: 'ERN'
  },
  {
    name: 'Estonia',
    countryCode: 'EE',
    countryISOCode: 'EST',
    dialCode: '+372',
    currency: 'EUR'
  },
  {
    name: 'Ethiopia',
    countryCode: 'ET',
    countryISOCode: 'ETH',
    dialCode: '+251',
    currency: 'ETB'
  },
  {
    name: 'Falkland Islands',
    countryCode: 'FK',
    countryISOCode: 'FLK',
    dialCode: '+500',
    currency: 'FKP'
  },
  {
    name: 'Faroe Islands',
    countryCode: 'FO',
    countryISOCode: 'FRO',
    dialCode: '+298',
    currency: 'DKK'
  },
  {
    name: 'Fiji',
    countryCode: 'FJ',
    countryISOCode: 'FJI',
    dialCode: '+679',
    currency: 'FJD'
  },
  {
    name: 'Finland',
    countryCode: 'FI',
    countryISOCode: 'FIN',
    dialCode: '+358',
    currency: 'EUR'
  },
  {
    name: 'France',
    countryCode: 'FR',
    countryISOCode: 'FRA',
    dialCode: '+33',
    currency: 'EUR'
  },
  {
    name: 'French Guiana',
    countryCode: 'GF',
    countryISOCode: 'GUF',
    dialCode: '+594',
    currency: 'EUR'
  },
  {
    name: 'French Polynesia',
    countryCode: 'PF',
    countryISOCode: 'PYF',
    dialCode: '+689',
    currency: 'XPF'
  },
  {
    name: 'French Southern Territories',
    countryCode: 'TF',
    countryISOCode: 'ATF',
    dialCode: '+262',
    currency: 'EUR'
  },
  {
    name: 'Gabon',
    countryCode: 'GA',
    countryISOCode: 'GAB',
    dialCode: '+241',
    currency: 'XAF'
  },
  {
    name: 'Gambia',
    countryCode: 'GM',
    countryISOCode: 'GMB',
    dialCode: '+220',
    currency: 'GMD'
  },
  {
    name: 'Georgia',
    countryCode: 'GE',
    countryISOCode: 'GEO',
    dialCode: '+995',
    currency: 'GEL'
  },
  {
    name: 'Germany',
    countryCode: 'DE',
    countryISOCode: 'DEU',
    dialCode: '+49',
    currency: 'EUR'
  },
  {
    name: 'Ghana',
    countryCode: 'GH',
    countryISOCode: 'GHA',
    dialCode: '+233',
    currency: 'GHS'
  },
  {
    name: 'Gibraltar',
    countryCode: 'GI',
    countryISOCode: 'GIB',
    dialCode: '+350',
    currency: 'GIP'
  },
  {
    name: 'Greece',
    countryCode: 'GR',
    countryISOCode: 'GRC',
    dialCode: '+30',
    currency: 'EUR'
  },
  {
    name: 'Greenland',
    countryCode: 'GL',
    countryISOCode: 'GRL',
    dialCode: '+299',
    currency: 'DKK'
  },
  {
    name: 'Grenada',
    countryCode: 'GD',
    countryISOCode: 'GRD',
    dialCode: '+1473',
    currency: 'XCD'
  },
  {
    name: 'Guadeloupe',
    countryCode: 'GP',
    countryISOCode: 'GLP',
    dialCode: '+590',
    currency: 'EUR'
  },
  {
    name: 'Guam',
    countryCode: 'GU',
    countryISOCode: 'GUM',
    dialCode: '+1671',
    currency: 'USD'
  },
  {
    name: 'Guatemala',
    countryCode: 'GT',
    countryISOCode: 'GTM',
    dialCode: '+502',
    currency: 'GTQ'
  },
  {
    name: 'Guernsey',
    countryCode: 'GG',
    countryISOCode: 'GGY',
    dialCode: '+44',
    currency: 'GBP'
  },
  {
    name: 'Guinea',
    countryCode: 'GN',
    countryISOCode: 'GIN',
    dialCode: '+224',
    currency: 'GNF'
  },
  {
    name: 'Guinea-Bissau',
    countryCode: 'GW',
    countryISOCode: 'GNB',
    dialCode: '+245',
    currency: 'XOF'
  },
  {
    name: 'Guyana',
    countryCode: 'GY',
    countryISOCode: 'GUY',
    dialCode: '+592',
    currency: 'GYD'
  },
  {
    name: 'Haiti',
    countryCode: 'HT',
    countryISOCode: 'HTI',
    dialCode: '+509',
    currency: 'HTG'
  },
  {
    name: 'Heard Island and McDonald Islands',
    countryCode: 'HM',
    countryISOCode: 'HMD',
    dialCode: '+ ',
    currency: 'AUD'
  },
  {
    name: 'Honduras',
    countryCode: 'HN',
    countryISOCode: 'HND',
    dialCode: '+504',
    currency: 'HNL'
  },
  {
    name: 'Hong Kong',
    countryCode: 'HK',
    countryISOCode: 'HKG',
    dialCode: '+852',
    currency: 'HKD'
  },
  {
    name: 'Hungary',
    countryCode: 'HU',
    countryISOCode: 'HUN',
    dialCode: '+36',
    currency: 'HUF'
  },
  {
    name: 'Iceland',
    countryCode: 'IS',
    countryISOCode: 'ISL',
    dialCode: '+354',
    currency: 'ISK'
  },
  {
    name: 'India',
    countryCode: 'IN',
    countryISOCode: 'IND',
    dialCode: '+91',
    currency: 'INR'
  },
  {
    name: 'Indonesia',
    countryCode: 'ID',
    countryISOCode: 'IDN',
    dialCode: '+62',
    currency: 'IDR'
  },
  {
    name: 'Iran',
    countryCode: 'IR',
    countryISOCode: 'IRN',
    dialCode: '+98',
    currency: 'IRR'
  },
  {
    name: 'Iraq',
    countryCode: 'IQ',
    countryISOCode: 'IRQ',
    dialCode: '+964',
    currency: 'IQD'
  },
  {
    name: 'Ireland',
    countryCode: 'IE',
    countryISOCode: 'IRL',
    dialCode: '+353',
    currency: 'EUR'
  },
  {
    name: 'Isle of Man',
    countryCode: 'IM',
    countryISOCode: 'IMN',
    dialCode: '+44',
    currency: 'GBP'
  },
  {
    name: 'Israel',
    countryCode: 'IL',
    countryISOCode: 'ISR',
    dialCode: '+972',
    currency: 'ILS'
  },
  {
    name: 'Italy',
    countryCode: 'IT',
    countryISOCode: 'ITA',
    dialCode: '+39',
    currency: 'EUR'
  },
  {
    name: 'Ivory Coast',
    countryCode: 'CI',
    countryISOCode: 'CIV',
    dialCode: '+225',
    currency: 'XOF'
  },
  {
    name: 'Jamaica',
    countryCode: 'JM',
    countryISOCode: 'JAM',
    dialCode: '+1876',
    currency: 'JMD'
  },
  {
    name: 'Japan',
    countryCode: 'JP',
    countryISOCode: 'JPN',
    dialCode: '+81',
    currency: 'JPY'
  },
  {
    name: 'Jersey',
    countryCode: 'JE',
    countryISOCode: 'JEY',
    dialCode: '+44',
    currency: 'GBP'
  },
  {
    name: 'Jordan',
    countryCode: 'JO',
    countryISOCode: 'JOR',
    dialCode: '+962',
    currency: 'JOD'
  },
  {
    name: 'Kazakhstan',
    countryCode: 'KZ',
    countryISOCode: 'KAZ',
    dialCode: '+7',
    currency: 'KZT'
  },
  {
    name: 'Kenya',
    countryCode: 'KE',
    countryISOCode: 'KEN',
    dialCode: '+254',
    currency: 'KES'
  },
  {
    name: 'Kiribati',
    countryCode: 'KI',
    countryISOCode: 'KIR',
    dialCode: '+686',
    currency: 'AUD'
  },
  {
    name: 'Kosovo',
    countryCode: 'XK',
    countryISOCode: 'XKX',
    dialCode: '+383',
    currency: 'EUR'
  },
  {
    name: 'Kuwait',
    countryCode: 'KW',
    countryISOCode: 'KWT',
    dialCode: '+965',
    currency: 'KWD'
  },
  {
    name: 'Kyrgyzstan',
    countryCode: 'KG',
    countryISOCode: 'KGZ',
    dialCode: '+996',
    currency: 'KGS'
  },
  {
    name: 'Laos',
    countryCode: 'LA',
    countryISOCode: 'LAO',
    dialCode: '+856',
    currency: 'LAK'
  },
  {
    name: 'Latvia',
    countryCode: 'LV',
    countryISOCode: 'LVA',
    dialCode: '+371',
    currency: 'EUR'
  },
  {
    name: 'Lebanon',
    countryCode: 'LB',
    countryISOCode: 'LBN',
    dialCode: '+961',
    currency: 'LBP'
  },
  {
    name: 'Lesotho',
    countryCode: 'LS',
    countryISOCode: 'LSO',
    dialCode: '+266',
    currency: 'LSL'
  },
  {
    name: 'Liberia',
    countryCode: 'LR',
    countryISOCode: 'LBR',
    dialCode: '+231',
    currency: 'LRD'
  },
  {
    name: 'Libya',
    countryCode: 'LY',
    countryISOCode: 'LBY',
    dialCode: '+218',
    currency: 'LYD'
  },
  {
    name: 'Liechtenstein',
    countryCode: 'LI',
    countryISOCode: 'LIE',
    dialCode: '+423',
    currency: 'CHF'
  },
  {
    name: 'Lithuania',
    countryCode: 'LT',
    countryISOCode: 'LTU',
    dialCode: '+370',
    currency: 'LTL'
  },
  {
    name: 'Luxembourg',
    countryCode: 'LU',
    countryISOCode: 'LUX',
    dialCode: '+352',
    currency: 'EUR'
  },
  {
    name: 'Macao',
    countryCode: 'MO',
    countryISOCode: 'MAC',
    dialCode: '+853',
    currency: 'MOP'
  },
  {
    name: 'Macedonia',
    countryCode: 'MK',
    countryISOCode: 'MKD',
    dialCode: '+389',
    currency: 'MKD'
  },
  {
    name: 'Madagascar',
    countryCode: 'MG',
    countryISOCode: 'MDG',
    dialCode: '+261',
    currency: 'MGA'
  },
  {
    name: 'Malawi',
    countryCode: 'MW',
    countryISOCode: 'MWI',
    dialCode: '+265',
    currency: 'MWK'
  },
  {
    name: 'Malaysia',
    countryCode: 'MY',
    countryISOCode: 'MYS',
    dialCode: '+60',
    currency: 'MYR'
  },
  {
    name: 'Maldives',
    countryCode: 'MV',
    countryISOCode: 'MDV',
    dialCode: '+960',
    currency: 'MVR'
  },
  {
    name: 'Mali',
    countryCode: 'ML',
    countryISOCode: 'MLI',
    dialCode: '+223',
    currency: 'XOF'
  },
  {
    name: 'Malta',
    countryCode: 'MT',
    countryISOCode: 'MLT',
    dialCode: '+356',
    currency: 'EUR'
  },
  {
    name: 'Marshall Islands',
    countryCode: 'MH',
    countryISOCode: 'MHL',
    dialCode: '+692',
    currency: 'USD'
  },
  {
    name: 'Martinique',
    countryCode: 'MQ',
    countryISOCode: 'MTQ',
    dialCode: '+596',
    currency: 'EUR'
  },
  {
    name: 'Mauritania',
    countryCode: 'MR',
    countryISOCode: 'MRT',
    dialCode: '+222',
    currency: 'MRO'
  },
  {
    name: 'Mauritius',
    countryCode: 'MU',
    countryISOCode: 'MUS',
    dialCode: '+230',
    currency: 'MUR'
  },
  {
    name: 'Mayotte',
    countryCode: 'YT',
    countryISOCode: 'MYT',
    dialCode: '+262',
    currency: 'EUR'
  },
  {
    name: 'Mexico',
    countryCode: 'MX',
    countryISOCode: 'MEX',
    dialCode: '+52',
    currency: 'MXN'
  },
  {
    name: 'Micronesia',
    countryCode: 'FM',
    countryISOCode: 'FSM',
    dialCode: '+691',
    currency: 'USD'
  },
  {
    name: 'Moldova',
    countryCode: 'MD',
    countryISOCode: 'MDA',
    dialCode: '+373',
    currency: 'MDL'
  },
  {
    name: 'Monaco',
    countryCode: 'MC',
    countryISOCode: 'MCO',
    dialCode: '+377',
    currency: 'EUR'
  },
  {
    name: 'Mongolia',
    countryCode: 'MN',
    countryISOCode: 'MNG',
    dialCode: '+976',
    currency: 'MNT'
  },
  {
    name: 'Montenegro',
    countryCode: 'ME',
    countryISOCode: 'MNE',
    dialCode: '+382',
    currency: 'EUR'
  },
  {
    name: 'Montserrat',
    countryCode: 'MS',
    countryISOCode: 'MSR',
    dialCode: '+1664',
    currency: 'XCD'
  },
  {
    name: 'Morocco',
    countryCode: 'MA',
    countryISOCode: 'MAR',
    dialCode: '+212',
    currency: 'MAD'
  },
  {
    name: 'Mozambique',
    countryCode: 'MZ',
    countryISOCode: 'MOZ',
    dialCode: '+258',
    currency: 'MZN'
  },
  {
    name: 'Myanmar',
    countryCode: 'MM',
    countryISOCode: 'MMR',
    dialCode: '+95',
    currency: 'MMK'
  },
  {
    name: 'Namibia',
    countryCode: 'NA',
    countryISOCode: 'NAM',
    dialCode: '+264',
    currency: 'NAD'
  },
  {
    name: 'Nauru',
    countryCode: 'NR',
    countryISOCode: 'NRU',
    dialCode: '+674',
    currency: 'AUD'
  },
  {
    name: 'Nepal',
    countryCode: 'NP',
    countryISOCode: 'NPL',
    dialCode: '+977',
    currency: 'NPR'
  },
  {
    name: 'Netherlands',
    countryCode: 'NL',
    countryISOCode: 'NLD',
    dialCode: '+31',
    currency: 'EUR'
  },
  {
    name: 'New Caledonia',
    countryCode: 'NC',
    countryISOCode: 'NCL',
    dialCode: '+687',
    currency: 'XPF'
  },
  {
    name: 'New Zealand',
    countryCode: 'NZ',
    countryISOCode: 'NZL',
    dialCode: '+64',
    currency: 'NZD'
  },
  {
    name: 'Nicaragua',
    countryCode: 'NI',
    countryISOCode: 'NIC',
    dialCode: '+505',
    currency: 'NIO'
  },
  {
    name: 'Niger',
    countryCode: 'NE',
    countryISOCode: 'NER',
    dialCode: '+227',
    currency: 'XOF'
  },
  {
    name: 'Nigeria',
    countryCode: 'NG',
    countryISOCode: 'NGA',
    dialCode: '+234',
    currency: 'NGN'
  },
  {
    name: 'Niue',
    countryCode: 'NU',
    countryISOCode: 'NIU',
    dialCode: '+683',
    currency: 'NZD'
  },
  {
    name: 'Norfolk Island',
    countryCode: 'NF',
    countryISOCode: 'NFK',
    dialCode: '+672',
    currency: 'AUD'
  },
  {
    name: 'North Korea',
    countryCode: 'KP',
    countryISOCode: 'PRK',
    dialCode: '+850',
    currency: 'KPW'
  },
  {
    name: 'Northern Mariana Islands',
    countryCode: 'MP',
    countryISOCode: 'MNP',
    dialCode: '+1670',
    currency: 'USD'
  },
  {
    name: 'Norway',
    countryCode: 'NO',
    countryISOCode: 'NOR',
    dialCode: '+47',
    currency: 'NOK'
  },
  {
    name: 'Oman',
    countryCode: 'OM',
    countryISOCode: 'OMN',
    dialCode: '+968',
    currency: 'OMR'
  },
  {
    name: 'Pakistan',
    countryCode: 'PK',
    countryISOCode: 'PAK',
    dialCode: '+92',
    currency: 'PKR'
  },
  {
    name: 'Palau',
    countryCode: 'PW',
    countryISOCode: 'PLW',
    dialCode: '+680',
    currency: 'USD'
  },
  {
    name: 'Palestinian Territory',
    countryCode: 'PS',
    countryISOCode: 'PSE',
    dialCode: '+970',
    currency: 'ILS'
  },
  {
    name: 'Panama',
    countryCode: 'PA',
    countryISOCode: 'PAN',
    dialCode: '+507',
    currency: 'PAB'
  },
  {
    name: 'Papua New Guinea',
    countryCode: 'PG',
    countryISOCode: 'PNG',
    dialCode: '+675',
    currency: 'PGK'
  },
  {
    name: 'Paraguay',
    countryCode: 'PY',
    countryISOCode: 'PRY',
    dialCode: '+595',
    currency: 'PYG'
  },
  {
    name: 'Peru',
    countryCode: 'PE',
    countryISOCode: 'PER',
    dialCode: '+51',
    currency: 'PEN'
  },
  {
    name: 'Philippines',
    countryCode: 'PH',
    countryISOCode: 'PHL',
    dialCode: '+63',
    currency: 'PHP'
  },
  {
    name: 'Pitcairn',
    countryCode: 'PN',
    countryISOCode: 'PCN',
    dialCode: '+870',
    currency: 'NZD'
  },
  {
    name: 'Poland',
    countryCode: 'PL',
    countryISOCode: 'POL',
    dialCode: '+48',
    currency: 'PLN'
  },
  {
    name: 'Portugal',
    countryCode: 'PT',
    countryISOCode: 'PRT',
    dialCode: '+351',
    currency: 'EUR'
  },
  {
    name: 'Puerto Rico',
    countryCode: 'PR',
    countryISOCode: 'PRI',
    dialCode: '+1939',
    currency: 'USD'
  },
  {
    name: 'Qatar',
    countryCode: 'QA',
    countryISOCode: 'QAT',
    dialCode: '+974',
    currency: 'QAR'
  },
  {
    name: 'Republic of the Congo',
    countryCode: 'CG',
    countryISOCode: 'COG',
    dialCode: '+242',
    currency: 'XAF'
  },
  {
    name: 'Reunion',
    countryCode: 'RE',
    countryISOCode: 'REU',
    dialCode: '+262',
    currency: 'EUR'
  },
  {
    name: 'Romania',
    countryCode: 'RO',
    countryISOCode: 'ROU',
    dialCode: '+40',
    currency: 'RON'
  },
  {
    name: 'Russia',
    countryCode: 'RU',
    countryISOCode: 'RUS',
    dialCode: '+7',
    currency: 'RUB'
  },
  {
    name: 'Rwanda',
    countryCode: 'RW',
    countryISOCode: 'RWA',
    dialCode: '+250',
    currency: 'RWF'
  },
  {
    name: 'Saint Barthelemy',
    countryCode: 'BL',
    countryISOCode: 'BLM',
    dialCode: '+590',
    currency: 'EUR'
  },
  {
    name: 'Saint Helena',
    countryCode: 'SH',
    countryISOCode: 'SHN',
    dialCode: '+290',
    currency: 'SHP'
  },
  {
    name: 'Saint Kitts and Nevis',
    countryCode: 'KN',
    countryISOCode: 'KNA',
    dialCode: '+1869',
    currency: 'XCD'
  },
  {
    name: 'Saint Lucia',
    countryCode: 'LC',
    countryISOCode: 'LCA',
    dialCode: '+1758',
    currency: 'XCD'
  },
  {
    name: 'Saint Martin',
    countryCode: 'MF',
    countryISOCode: 'MAF',
    dialCode: '+590',
    currency: 'EUR'
  },
  {
    name: 'Saint Pierre and Miquelon',
    countryCode: 'PM',
    countryISOCode: 'SPM',
    dialCode: '+508',
    currency: 'EUR'
  },
  {
    name: 'Saint Vincent and the Grenadines',
    countryCode: 'VC',
    countryISOCode: 'VCT',
    dialCode: '+1784',
    currency: 'XCD'
  },
  {
    name: 'Samoa',
    countryCode: 'WS',
    countryISOCode: 'WSM',
    dialCode: '+685',
    currency: 'WST'
  },
  {
    name: 'San Marino',
    countryCode: 'SM',
    countryISOCode: 'SMR',
    dialCode: '+378',
    currency: 'EUR'
  },
  {
    name: 'Sao Tome and Principe',
    countryCode: 'ST',
    countryISOCode: 'STP',
    dialCode: '+239',
    currency: 'STD'
  },
  {
    name: 'Saudi Arabia',
    countryCode: 'SA',
    countryISOCode: 'SAU',
    dialCode: '+966',
    currency: 'SAR'
  },
  {
    name: 'Senegal',
    countryCode: 'SN',
    countryISOCode: 'SEN',
    dialCode: '+221',
    currency: 'XOF'
  },
  {
    name: 'Serbia',
    countryCode: 'RS',
    countryISOCode: 'SRB',
    dialCode: '+381',
    currency: 'RSD'
  },
  {
    name: 'Seychelles',
    countryCode: 'SC',
    countryISOCode: 'SYC',
    dialCode: '+248',
    currency: 'SCR'
  },
  {
    name: 'Sierra Leone',
    countryCode: 'SL',
    countryISOCode: 'SLE',
    dialCode: '+232',
    currency: 'SLL'
  },
  {
    name: 'Singapore',
    countryCode: 'SG',
    countryISOCode: 'SGP',
    dialCode: '+65',
    currency: 'SGD'
  },
  {
    name: 'Sint Maarten',
    countryCode: 'SX',
    countryISOCode: 'SXM',
    dialCode: '+599',
    currency: 'ANG'
  },
  {
    name: 'Slovakia',
    countryCode: 'SK',
    countryISOCode: 'SVK',
    dialCode: '+421',
    currency: 'EUR'
  },
  {
    name: 'Slovenia',
    countryCode: 'SI',
    countryISOCode: 'SVN',
    dialCode: '+386',
    currency: 'EUR'
  },
  {
    name: 'Solomon Islands',
    countryCode: 'SB',
    countryISOCode: 'SLB',
    dialCode: '+677',
    currency: 'SBD'
  },
  {
    name: 'Somalia',
    countryCode: 'SO',
    countryISOCode: 'SOM',
    dialCode: '+252',
    currency: 'SOS'
  },
  {
    name: 'South Africa',
    countryCode: 'ZA',
    countryISOCode: 'ZAF',
    dialCode: '+27',
    currency: 'ZAR'
  },
  {
    name: 'South Georgia and the South Sandwich Islands',
    countryCode: 'GS',
    countryISOCode: 'SGS',
    dialCode: '+500',
    currency: 'GBP'
  },
  {
    name: 'South Korea',
    countryCode: 'KR',
    countryISOCode: 'KOR',
    dialCode: '+82',
    currency: 'KRW'
  },
  {
    name: 'South Sudan',
    countryCode: 'SS',
    countryISOCode: 'SSD',
    dialCode: '+211',
    currency: 'SSP'
  },
  {
    name: 'Spain',
    countryCode: 'ES',
    countryISOCode: 'ESP',
    dialCode: '+34',
    currency: 'EUR'
  },
  {
    name: 'Sri Lanka',
    countryCode: 'LK',
    countryISOCode: 'LKA',
    dialCode: '+94',
    currency: 'LKR'
  },
  {
    name: 'Sudan',
    countryCode: 'SD',
    countryISOCode: 'SDN',
    dialCode: '+249',
    currency: 'SDG'
  },
  {
    name: 'Suriname',
    countryCode: 'SR',
    countryISOCode: 'SUR',
    dialCode: '+597',
    currency: 'SRD'
  },
  {
    name: 'Svalbard and Jan Mayen',
    countryCode: 'SJ',
    countryISOCode: 'SJM',
    dialCode: '+47',
    currency: 'NOK'
  },
  {
    name: 'Swaziland',
    countryCode: 'SZ',
    countryISOCode: 'SWZ',
    dialCode: '+268',
    currency: 'SZL'
  },
  {
    name: 'Sweden',
    countryCode: 'SE',
    countryISOCode: 'SWE',
    dialCode: '+46',
    currency: 'SEK'
  },
  {
    name: 'Switzerland',
    countryCode: 'CH',
    countryISOCode: 'CHE',
    dialCode: '+41',
    currency: 'CHF'
  },
  {
    name: 'Syria',
    countryCode: 'SY',
    countryISOCode: 'SYR',
    dialCode: '+963',
    currency: 'SYP'
  },
  {
    name: 'Taiwan',
    countryCode: 'TW',
    countryISOCode: 'TWN',
    dialCode: '+886',
    currency: 'TWD'
  },
  {
    name: 'Tajikistan',
    countryCode: 'TJ',
    countryISOCode: 'TJK',
    dialCode: '+992',
    currency: 'TJS'
  },
  {
    name: 'Tanzania',
    countryCode: 'TZ',
    countryISOCode: 'TZA',
    dialCode: '+255',
    currency: 'TZS'
  },
  {
    name: 'Thailand',
    countryCode: 'TH',
    countryISOCode: 'THA',
    dialCode: '+66',
    currency: 'THB'
  },
  {
    name: 'Togo',
    countryCode: 'TG',
    countryISOCode: 'TGO',
    dialCode: '+228',
    currency: 'XOF'
  },
  {
    name: 'Tokelau',
    countryCode: 'TK',
    countryISOCode: 'TKL',
    dialCode: '+690',
    currency: 'NZD'
  },
  {
    name: 'Tonga',
    countryCode: 'TO',
    countryISOCode: 'TON',
    dialCode: '+676',
    currency: 'TOP'
  },
  {
    name: 'Trinidad and Tobago',
    countryCode: 'TT',
    countryISOCode: 'TTO',
    dialCode: '+1868',
    currency: 'TTD'
  },
  {
    name: 'Tunisia',
    countryCode: 'TN',
    countryISOCode: 'TUN',
    dialCode: '+216',
    currency: 'TND'
  },
  {
    name: 'Turkey',
    countryCode: 'TR',
    countryISOCode: 'TUR',
    dialCode: '+90',
    currency: 'TRY'
  },
  {
    name: 'Turkmenistan',
    countryCode: 'TM',
    countryISOCode: 'TKM',
    dialCode: '+993',
    currency: 'TMT'
  },
  {
    name: 'Turks and Caicos Islands',
    countryCode: 'TC',
    countryISOCode: 'TCA',
    dialCode: '+1649',
    currency: 'USD'
  },
  {
    name: 'Tuvalu',
    countryCode: 'TV',
    countryISOCode: 'TUV',
    dialCode: '+688',
    currency: 'AUD'
  },
  {
    name: 'U.S. Virgin Islands',
    countryCode: 'VI',
    countryISOCode: 'VIR',
    dialCode: '+1340',
    currency: 'USD'
  },
  {
    name: 'Uganda',
    countryCode: 'UG',
    countryISOCode: 'UGA',
    dialCode: '+256',
    currency: 'UGX'
  },
  {
    name: 'Ukraine',
    countryCode: 'UA',
    countryISOCode: 'UKR',
    dialCode: '+380',
    currency: 'UAH'
  },
  {
    name: 'United Arab Emirates',
    countryCode: 'AE',
    countryISOCode: 'ARE',
    dialCode: '+971',
    currency: 'AED'
  },
  {
    name: 'United Kingdom',
    countryCode: 'GB',
    countryISOCode: 'GBR',
    dialCode: '+44',
    currency: 'GBP'
  },
  {
    name: 'United States',
    countryCode: 'US',
    countryISOCode: 'USA',
    dialCode: '+1',
    currency: 'USD'
  },
  {
    name: 'United States Minor Outlying Islands',
    countryCode: 'UM',
    countryISOCode: 'UMI',
    dialCode: '+1',
    currency: 'USD'
  },
  {
    name: 'Uruguay',
    countryCode: 'UY',
    countryISOCode: 'URY',
    dialCode: '+598',
    currency: 'UYU'
  },
  {
    name: 'Uzbekistan',
    countryCode: 'UZ',
    countryISOCode: 'UZB',
    dialCode: '+998',
    currency: 'UZS'
  },
  {
    name: 'Vanuatu',
    countryCode: 'VU',
    countryISOCode: 'VUT',
    dialCode: '+678',
    currency: 'VUV'
  },
  {
    name: 'Vatican',
    countryCode: 'VA',
    countryISOCode: 'VAT',
    dialCode: '+379',
    currency: 'EUR'
  },
  {
    name: 'Venezuela',
    countryCode: 'VE',
    countryISOCode: 'VEN',
    dialCode: '+58',
    currency: 'VEF'
  },
  {
    name: 'Vietnam',
    countryCode: 'VN',
    countryISOCode: 'VNM',
    dialCode: '+84',
    currency: 'VND'
  },
  {
    name: 'Wallis and Futuna',
    countryCode: 'WF',
    countryISOCode: 'WLF',
    dialCode: '+681',
    currency: 'XPF'
  },
  {
    name: 'Western Sahara',
    countryCode: 'EH',
    countryISOCode: 'ESH',
    dialCode: '+212',
    currency: 'MAD'
  },
  {
    name: 'Yemen',
    countryCode: 'YE',
    countryISOCode: 'YEM',
    dialCode: '+967',
    currency: 'YER'
  },
  {
    name: 'Zambia',
    countryCode: 'ZM',
    countryISOCode: 'ZMB',
    dialCode: '+260',
    currency: 'ZMK'
  },
  {
    name: 'Zimbabwe',
    countryCode: 'ZW',
    countryISOCode: 'ZWE',
    dialCode: '+263',
    currency: 'ZWL'
  }
];

export const currencyAbbreviations = {
  MYR: 'RM',
  USD: '$',
  EUR: '€',
  GBP: '£',
  AUD: '$',
  SGD: '$',
  JPY: '¥',
  CNY: '¥',
  HKD: '$',
  CAD: '$',
  NZD: '$',
  CHF: 'CHF',
  SEK: 'kr',
  DKK: 'kr',
  NOK: 'kr',
  MXN: '$',
  THB: '฿',
  PHP: '₱',
  IDR: 'Rp',
  KRW: '₩',
  TRY: '₺',
  RUB: '₽',
  INR: '₹',
  BRL: 'R$',
  ZAR: 'R',
  PLN: 'zł',
  TWD: 'NT$',
  SAR: '﷼',
  AED: 'د.إ',
  COP: '$',
  ILS: '₪'
};

export type Alpha2Code =
  | 'AF'
  | 'AL'
  | 'DZ'
  | 'AS'
  | 'AD'
  | 'AO'
  | 'AI'
  | 'AQ'
  | 'AG'
  | 'AR'
  | 'AM'
  | 'AW'
  | 'AU'
  | 'AT'
  | 'AZ'
  | 'BS'
  | 'BH'
  | 'BD'
  | 'BB'
  | 'BY'
  | 'BE'
  | 'BZ'
  | 'BJ'
  | 'BM'
  | 'BT'
  | 'BO'
  | 'BA'
  | 'BW'
  | 'BV'
  | 'BR'
  | 'IO'
  | 'BN'
  | 'BG'
  | 'BF'
  | 'BI'
  | 'KH'
  | 'CM'
  | 'CA'
  | 'CV'
  | 'KY'
  | 'CF'
  | 'TD'
  | 'CL'
  | 'CN'
  | 'CX'
  | 'CC'
  | 'CO'
  | 'KM'
  | 'CG'
  | 'CD'
  | 'CK'
  | 'CR'
  | 'CI'
  | 'HR'
  | 'CU'
  | 'CY'
  | 'CZ'
  | 'DK'
  | 'DJ'
  | 'DM'
  | 'DO'
  | 'EC'
  | 'EG'
  | 'SV'
  | 'GQ'
  | 'ER'
  | 'EE'
  | 'ET'
  | 'FK'
  | 'FO'
  | 'FJ'
  | 'FI'
  | 'FR'
  | 'GF'
  | 'PF'
  | 'TF'
  | 'GA'
  | 'GM'
  | 'GE'
  | 'DE'
  | 'GH'
  | 'GI'
  | 'GR'
  | 'GL'
  | 'GD'
  | 'GP'
  | 'GU'
  | 'GT'
  | 'GN'
  | 'GW'
  | 'GY'
  | 'HT'
  | 'HM'
  | 'VA'
  | 'HN'
  | 'HK'
  | 'HU'
  | 'IS'
  | 'IN'
  | 'ID'
  | 'IR'
  | 'IQ'
  | 'IE'
  | 'IL'
  | 'IT'
  | 'JM'
  | 'JP'
  | 'JO'
  | 'KZ'
  | 'KE'
  | 'KI'
  | 'KP'
  | 'KR'
  | 'KW'
  | 'KG'
  | 'LA'
  | 'LV'
  | 'LB'
  | 'LS'
  | 'LR'
  | 'LY'
  | 'LI'
  | 'LT'
  | 'LU'
  | 'MO'
  | 'MG'
  | 'MW'
  | 'MY'
  | 'MV'
  | 'ML'
  | 'MT'
  | 'MH'
  | 'MQ'
  | 'MR'
  | 'MU'
  | 'YT'
  | 'MX'
  | 'FM'
  | 'MD'
  | 'MC'
  | 'MN'
  | 'MS'
  | 'MA'
  | 'MZ'
  | 'MM'
  | 'NA'
  | 'NR'
  | 'NP'
  | 'NL'
  | 'NC'
  | 'NZ'
  | 'NI'
  | 'NE'
  | 'NG'
  | 'NU'
  | 'NF'
  | 'MP'
  | 'MK'
  | 'NO'
  | 'OM'
  | 'PK'
  | 'PW'
  | 'PS'
  | 'PA'
  | 'PG'
  | 'PY'
  | 'PE'
  | 'PH'
  | 'PN'
  | 'PL'
  | 'PT'
  | 'PR'
  | 'QA'
  | 'RE'
  | 'RO'
  | 'RU'
  | 'RW'
  | 'SH'
  | 'KN'
  | 'LC'
  | 'PM'
  | 'VC'
  | 'WS'
  | 'SM'
  | 'ST'
  | 'SA'
  | 'SN'
  | 'SC'
  | 'SL'
  | 'SG'
  | 'SK'
  | 'SI'
  | 'SB'
  | 'SO'
  | 'ZA'
  | 'GS'
  | 'ES'
  | 'LK'
  | 'SD'
  | 'SR'
  | 'SJ'
  | 'SZ'
  | 'SE'
  | 'CH'
  | 'SY'
  | 'TW'
  | 'TJ'
  | 'TZ'
  | 'TH'
  | 'TL'
  | 'TG'
  | 'TK'
  | 'TO'
  | 'TT'
  | 'TN'
  | 'TR'
  | 'TM'
  | 'TC'
  | 'TV'
  | 'UG'
  | 'UA'
  | 'AE'
  | 'GB'
  | 'US'
  | 'UM'
  | 'UY'
  | 'UZ'
  | 'VU'
  | 'VE'
  | 'VN'
  | 'VG'
  | 'VI'
  | 'WF'
  | 'EH'
  | 'YE'
  | 'ZM'
  | 'ZW'
  | 'AX'
  | 'BQ'
  | 'CW'
  | 'GG'
  | 'IM'
  | 'JE'
  | 'ME'
  | 'BL'
  | 'MF'
  | 'RS'
  | 'SX'
  | 'SS'
  | 'XK';

export type Alpha3Code =
  | 'AFG'
  | 'ALB'
  | 'DZA'
  | 'ASM'
  | 'AND'
  | 'AGO'
  | 'AIA'
  | 'ATA'
  | 'ATG'
  | 'ARG'
  | 'ARM'
  | 'ABW'
  | 'AUS'
  | 'AUT'
  | 'AZE'
  | 'BHS'
  | 'BHR'
  | 'BGD'
  | 'BRB'
  | 'BLR'
  | 'BEL'
  | 'BLZ'
  | 'BEN'
  | 'BMU'
  | 'BTN'
  | 'BOL'
  | 'BIH'
  | 'BWA'
  | 'BVT'
  | 'BRA'
  | 'IOT'
  | 'BRN'
  | 'BGR'
  | 'BFA'
  | 'BDI'
  | 'KHM'
  | 'CMR'
  | 'CAN'
  | 'CPV'
  | 'CYM'
  | 'CAF'
  | 'TCD'
  | 'CHL'
  | 'CHN'
  | 'CXR'
  | 'CCK'
  | 'COL'
  | 'COM'
  | 'COG'
  | 'COD'
  | 'COK'
  | 'CRI'
  | 'CIV'
  | 'HRV'
  | 'CUB'
  | 'CYP'
  | 'CZE'
  | 'DNK'
  | 'DJI'
  | 'DMA'
  | 'DOM'
  | 'ECU'
  | 'EGY'
  | 'SLV'
  | 'GNQ'
  | 'ERI'
  | 'EST'
  | 'ETH'
  | 'FLK'
  | 'FRO'
  | 'FJI'
  | 'FIN'
  | 'FRA'
  | 'GUF'
  | 'PYF'
  | 'ATF'
  | 'GAB'
  | 'GMB'
  | 'GEO'
  | 'DEU'
  | 'GHA'
  | 'GIB'
  | 'GRC'
  | 'GRL'
  | 'GRD'
  | 'GLP'
  | 'GUM'
  | 'GTM'
  | 'GIN'
  | 'GNB'
  | 'GUY'
  | 'HTI'
  | 'HMD'
  | 'VAT'
  | 'HND'
  | 'HKG'
  | 'HUN'
  | 'ISL'
  | 'IND'
  | 'IDN'
  | 'IRN'
  | 'IRQ'
  | 'IRL'
  | 'ISR'
  | 'ITA'
  | 'JAM'
  | 'JPN'
  | 'JOR'
  | 'KAZ'
  | 'KEN'
  | 'KIR'
  | 'PRK'
  | 'KOR'
  | 'KWT'
  | 'KGZ'
  | 'LAO'
  | 'LVA'
  | 'LBN'
  | 'LSO'
  | 'LBR'
  | 'LBY'
  | 'LIE'
  | 'LTU'
  | 'LUX'
  | 'MAC'
  | 'MDG'
  | 'MWI'
  | 'MYS'
  | 'MDV'
  | 'MLI'
  | 'MLT'
  | 'MHL'
  | 'MTQ'
  | 'MRT'
  | 'MUS'
  | 'MYT'
  | 'MEX'
  | 'FSM'
  | 'MDA'
  | 'MCO'
  | 'MNG'
  | 'MSR'
  | 'MAR'
  | 'MOZ'
  | 'MMR'
  | 'NAM'
  | 'NRU'
  | 'NPL'
  | 'NLD'
  | 'NCL'
  | 'NZL'
  | 'NIC'
  | 'NER'
  | 'NGA'
  | 'NIU'
  | 'NFK'
  | 'MNP'
  | 'MKD'
  | 'NOR'
  | 'OMN'
  | 'PAK'
  | 'PLW'
  | 'PSE'
  | 'PAN'
  | 'PNG'
  | 'PRY'
  | 'PER'
  | 'PHL'
  | 'PCN'
  | 'POL'
  | 'PRT'
  | 'PRI'
  | 'QAT'
  | 'REU'
  | 'ROU'
  | 'RUS'
  | 'RWA'
  | 'SHN'
  | 'KNA'
  | 'LCA'
  | 'SPM'
  | 'VCT'
  | 'WSM'
  | 'SMR'
  | 'STP'
  | 'SAU'
  | 'SEN'
  | 'SYC'
  | 'SLE'
  | 'SGP'
  | 'SVK'
  | 'SVN'
  | 'SLB'
  | 'SOM'
  | 'ZAF'
  | 'SGS'
  | 'ESP'
  | 'LKA'
  | 'SDN'
  | 'SUR'
  | 'SJM'
  | 'SWZ'
  | 'SWE'
  | 'CHE'
  | 'SYR'
  | 'TWN'
  | 'TJK'
  | 'TZA'
  | 'THA'
  | 'TLS'
  | 'TGO'
  | 'TKL'
  | 'TON'
  | 'TTO'
  | 'TUN'
  | 'TUR'
  | 'TKM'
  | 'TCA'
  | 'TUV'
  | 'UGA'
  | 'UKR'
  | 'ARE'
  | 'GBR'
  | 'USA'
  | 'UMI'
  | 'URY'
  | 'UZB'
  | 'VUT'
  | 'VEN'
  | 'VNM'
  | 'VGB'
  | 'VIR'
  | 'WLF'
  | 'ESH'
  | 'YEM'
  | 'ZMB'
  | 'ZWE'
  | 'ALA'
  | 'BES'
  | 'CUW'
  | 'GGY'
  | 'IMN'
  | 'JEY'
  | 'MNE'
  | 'BLM'
  | 'MAF'
  | 'SRB'
  | 'SXM'
  | 'SSD'
  | 'XKX';
