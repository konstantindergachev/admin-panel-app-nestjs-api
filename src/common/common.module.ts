import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '@app/jwtconfig';

@Module({
  imports: [JwtModule.register(jwtConfig)],
  exports: [JwtModule],
})
export class CommonModule {}
