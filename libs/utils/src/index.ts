import async from 'async';
import _ from 'lodash';

/** Remove white space in string */
export const trimString = (str: string): string => {
  if (!str) return str;
  if (!_.isString(str)) return str;
  return str.replace(/^\s+|\s+$/g, '');
};

export const splitStringToArray = (str: string, symbol: string): string[] => {
  if (!str) return [];
  const result = str.split(symbol);
  result.forEach((val, index) => {
    result[index] = trimString(val);
  });
  return _.isEmpty(result) ? [] : result;
};

export const createCargo = (size?: number) => {
  return async.cargo(async (tasks: Array<() => Promise<void>>, callback) => {
    await Promise.all(
      _.map(tasks, async (task) => {
        if (task) await task();
      })
    );
    callback();
  }, size || 5);
};

export const roundTo2Decimal = (val: number) => Math.round(val * 100) / 100;

export function asyncForEach<Type>(
  array: Type[],
  callback: (data: Type, index: number, array: Type[]) => Promise<void>
) {
  return new Promise(async (resolve, reject) => {
    for (let index = 0; index < array.length; index++) {
      try {
        await callback(array[index], index, array);
      } catch (e) {
        reject(e);
      }
    }
    resolve(true);
  });
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const promisify = (fn: Function) => {
  return (...args: any[]) =>
    new Promise((resolve, reject) => {
      fn(...args, (err: Error, data: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
};

/**
 *
 * @param lat1
 * @param lon1
 * @param lat2
 * @param lon2
 * @returns in meter
 */
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const earthRadius = 6371000; // in meters

  // Convert coordinates from degrees to radians
  const toRadians = (degrees) => degrees * (Math.PI / 180);
  const phi1 = toRadians(lat1);
  const phi2 = toRadians(lat2);
  const deltaPhi = toRadians(lat2 - lat1);
  const deltaLambda = toRadians(lon2 - lon1);

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadius * c;
  return distance;
};
