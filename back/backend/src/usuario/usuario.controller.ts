import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import { UsuarioService } from './usuario.service';
import { ListaUsuarioDTO } from "./dto/ListaUsuarioDTO";
import { AtualizaUsuarioDTO } from "./dto/AtualizaUsuarioDTO";
import { v4 as uuid} from "uuid"
import { UsuarioEntity } from './usuarioEntity';


@Controller('/usuarios')
export class UsuarioController {
    
    constructor(private usuarioService: UsuarioService){
        
    }

        

    @Post()
    async criaUsuario(@Body() dadosDoUsuario:CriarUsuarioDto    ) {
        const usuarioEntity = new UsuarioEntity();
        usuarioEntity.email = dadosDoUsuario.email;
        usuarioEntity.nome = dadosDoUsuario.nome;
        usuarioEntity.id = uuid();

       await  this.usuarioService.salvar(usuarioEntity);
       return {
        usuario: new ListaUsuarioDTO(usuarioEntity.id,usuarioEntity.nome),
        message: "usuario criado com sucesso"}

           
    }

    @Get()
    async listUsuarios(){
        const usuariosSalvos = await this.usuarioService.listarUsuario()
        const usuariosLista  = usuariosSalvos.map(
            usuario => new ListaUsuarioDTO(
                usuario.id,
                usuario.nome,
            )
        );
        return usuariosLista ;  
        
    }
    @Put('/:id')
    async atualizaUsuario(
    @Param('id') id: string,
    @Body() novosDados: AtualizaUsuarioDTO
) {
    const usuarioAtualizado = await this.usuarioService.atualizar(
        id,
        novosDados  
    );

    return {
        usuario: usuarioAtualizado,
        message: "Usuário atualizado com sucesso"
    };
}
    @Delete('/:id')
    async removeUsuario (@Param('id') id: string){
    const  usuarioRemovido = await this.usuarioService.remove(id);

    return {
        usuario: usuarioRemovido,
        message: 'Usuario removido com sucesso'
    }
    }
}    