import { Injectable } from '@nestjs/common';
import type { HealthStatus } from '@projetox/contracts';

@Injectable()
export class HealthService {
  check(): HealthStatus {
    return {
      status: 'ok',
      service: 'projetox-api',
      version: process.env.npm_package_version ?? '0.0.1',
      timestamp: new Date().toISOString(),
    };
  }
}
