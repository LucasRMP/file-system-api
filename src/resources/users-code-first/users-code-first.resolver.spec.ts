import { Test, TestingModule } from '@nestjs/testing';
import { UsersCodeFirstResolver } from './users-code-first.resolver';
import { UsersCodeFirstService } from './users-code-first.service';

describe('UsersCodeFirstResolver', () => {
  let resolver: UsersCodeFirstResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersCodeFirstResolver, UsersCodeFirstService],
    }).compile();

    resolver = module.get<UsersCodeFirstResolver>(UsersCodeFirstResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
