import { Inject } from '@nestjs/common';

import { getServiceName } from './config';

export const InjectJwtAuthService = (instance: string) => Inject(getServiceName(instance));
