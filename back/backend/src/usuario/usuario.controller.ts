import { Body, Controller, Get, Post } from '@nestjs/common';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import { UsuarioService } from './usuario.service';

@Controller('/usuario')
export class UsuarioController {
    constructor(private usuarioService: UsuarioService){
        
    }
@Post()
     create(@Body()dadosDoUsario:CriarUsuarioDto){
        return this.usuarioService.salvar(dadosDoUsario);
         
    }
@Get()
    listar(){
        return this.usuarioService.listarUsuario()
    }
}
