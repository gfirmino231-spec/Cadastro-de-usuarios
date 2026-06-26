import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario/usuario.controller';
import { UsuarioService } from './usuario/usuario.service';
import { UsuarioModule } from './usuario/usuario.module';
import { VerificarEmail } from './usuario/dto/validacao/verificar-email';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UsuarioModule,PrismaModule],
  controllers: [UsuarioController],
  providers: [UsuarioService, VerificarEmail],
})
export class AppModule {}
