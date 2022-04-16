import { Module } from '@nestjs/common';
import { UsersCodeFirstService } from './users-code-first.service';
import { UsersCodeFirstResolver } from './users-code-first.resolver';

@Module({
  providers: [UsersCodeFirstResolver, UsersCodeFirstService],
})
export class UsersCodeFirstModule {}
