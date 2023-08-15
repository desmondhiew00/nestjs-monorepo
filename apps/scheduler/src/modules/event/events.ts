export class ScheduleOrder {
  constructor(public readonly orderId: number, public readonly date: Date) {}

  public getJobName(): string {
    return `schedule-order-${this.orderId}`;
  }
}
