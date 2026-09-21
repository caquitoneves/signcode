import { Test } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService],
    }).compile();

    controller = moduleRef.get(HealthController);
  });

  it('retorna status "ok" com metadados do serviço', () => {
    const result = controller.check();
    expect(result.status).toBe('ok');
    expect(result.service).toBe('projetox-api');
    expect(typeof result.version).toBe('string');
    expect(() => new Date(result.timestamp).toISOString()).not.toThrow();
  });
});
