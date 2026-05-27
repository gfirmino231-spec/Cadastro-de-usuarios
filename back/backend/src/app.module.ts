import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario/usuario.controller';
import { UsuarioService } from './usuario/usuario.service';
import { UsuarioModule } from './usuario/usuario.module';
import { VerificarEmail } from './usuario/dto/validacao/verificar-email';

@Module({
  imports: [UsuarioModule],
  controllers: [UsuarioController],
  providers: [UsuarioService, VerificarEmail],
})
export class AppModule {}
