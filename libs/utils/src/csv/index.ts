import * as csv from 'csv';
import dayjs from 'dayjs';

interface Column {
  key: string;
  header: string;
}

export const generateCsv = <DataType>(
  timezone: string,
  columns: Column[],
  data: DataType[],
  dateFields: string[],
  formatter?: (data: DataType) => any
) => {
  const csvStringifier = csv.stringify({ header: true, columns });

  data.forEach((row) => {
    const formatData = (data: DataType) => {
      Object.keys(data).forEach((key) => {
        if (data[key] === null) data[key] = '';
        if (dateFields.includes(key)) data[key] = formatDateToString(data[key], timezone);
      });
      return formatter ? formatter(data) : data;
    };
    csvStringifier.write(formatData(row));
  });

  return csvStringifier;
};

const formatDateToString = (date: any, timezone: string) => {
  let formatted = date;
  if (typeof formatted === 'string' && dayjs(formatted).isValid()) {
    formatted = dayjs.tz(formatted, timezone).format('YYYY-MM-DD HH:mm:ss');
  } else if (formatted instanceof Date) {
    formatted = dayjs.tz(formatted, timezone).format('YYYY-MM-DD HH:mm:ss');
  }
  return formatted;
};
