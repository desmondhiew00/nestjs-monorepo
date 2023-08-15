export class ColumnNumericTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number | null {
    if (!data) return null;
    return parseFloat(data);
  }
}

// export class BooleanTransformer {
//   to(data: number): boolean {
//     if (data === 1) return true;
//     return false;
//   }
//   from(data: number): boolean {
//     if (data === 1) return true;
//     return false;
//   }
// }
