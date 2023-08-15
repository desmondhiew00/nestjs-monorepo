import dayjs from 'dayjs';
import { LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

export const DateFilter = {
  '>=now': () => MoreThanOrEqual(dayjs().toDate()),
  '<=now': () => LessThanOrEqual(dayjs().toDate())
};
