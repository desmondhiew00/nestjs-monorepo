import numeral from 'numeral';

export const parseMoney = (value: number) => numeral(value).format('0,0.00');
