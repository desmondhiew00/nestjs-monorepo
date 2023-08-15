import { Column, ColumnOptions } from 'typeorm';

import { ColumnNumericTransformer } from './transformer';

/**
 * @param digits total length included decimal points
 * @param decimal length after decimal points
 * @returns
 */
export const ColumnDecimal = (digits: number, decimal: number, options?: ColumnOptions): PropertyDecorator => {
  return (target: any, propertyKey: string) => {
    const decorator = Column({
      type: 'decimal',
      precision: digits,
      scale: decimal,
      transformer: new ColumnNumericTransformer(),
      ...options
    });
    decorator(target, propertyKey);
  };
};

export const ColumnForeignKey = (options?: ColumnOptions): PropertyDecorator => {
  return (target: any, propertyKey: string) => {
    const decorator = Column({ type: 'int', unsigned: true, ...options });
    decorator(target, propertyKey);
  };
};

export const ColumnVarchar = (length?: number, options?: ColumnOptions): PropertyDecorator => {
  return (target: any, propertyKey: string) => {
    const decorator = Column({ type: 'varchar', length, ...options });
    decorator(target, propertyKey);
  };
};

export const ColumnBoolean = (defaultValue?: boolean, options?: ColumnOptions): PropertyDecorator => {
  return (target: any, propertyKey: string) => {
    const decorator = Column({ type: 'boolean', default: defaultValue, ...options });
    decorator(target, propertyKey);
  };
};

export const ColumnEnum = (enumVar: Record<string, string>, options?: ColumnOptions): PropertyDecorator => {
  return (target: any, propertyKey: string) => {
    const decorator = Column({ type: 'enum', enum: enumVar, ...options });
    decorator(target, propertyKey);
  };
};

// Decimal
export const ColumnCurrency = (options?: ColumnOptions) => ColumnDecimal(12, 2, options);
export const ColumnCoordinate = (options?: ColumnOptions) => ColumnDecimal(11, 7, options);
export const ColumnTaxRate = (options?: ColumnOptions) => ColumnDecimal(6, 2, options); // Up to 9000.00%
export const ColumnPercentage = (options?: ColumnOptions) => ColumnDecimal(6, 2, options); // Up to 9000.00%

// Varchar
export const ColumnCurrencyCode = (options?: ColumnOptions) => ColumnVarchar(3, options);
export const ColumnPhoneCode = (options?: ColumnOptions) => ColumnVarchar(10, options);
export const ColumnPhoneNo = (options?: ColumnOptions) => ColumnVarchar(20, options);
export const ColumnCountryCode = (options?: ColumnOptions) => ColumnVarchar(2, { default: 'MY', ...options });
