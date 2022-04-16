import { Test, TestingModule } from '@nestjs/testing';
import { UsersCodeFirstService } from './users-code-first.service';

describe('UsersCodeFirstService', () => {
  let service: UsersCodeFirstService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersCodeFirstService],
    }).compile();

    service = module.get<UsersCodeFirstService>(UsersCodeFirstService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
