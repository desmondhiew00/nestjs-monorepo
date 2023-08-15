# Scheduler Microservice Usage

## Usage (Client App)

1. Import ClientProxyModule in AppModule
2. Inject ClientProxy in constructor
3. Emit event

**Step 1: (AppModule)**

```ts
const SchedulerMicroservice = ClientsModule.register([
  { name: 'SCHEDULER', transport: Transport.TCP, options: { port: Number(process.env.SCHEDULER_PORT) } }
]);

imports: [SchedulerMicroservice];
```

**Step 2: (AppService)**

```ts
import * as E from '@scheduler/modules/event/events';

constructor(@Inject('SCHEDULER') private scheduler: ClientProxy) {}

this.scheduler.emit(E.ScheduleOrder.name, new E.ScheduleOrder(orderId, deliveryAt));

```

## Usage (Microservice)

1. Define event type in (`events.ts`)
2. Define event handler in (`*.controller.ts`)
3. Define logic in (`*.service.ts`)
