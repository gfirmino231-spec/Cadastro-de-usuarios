import { Injectable } from '@nestjs/common';

@Injectable()
export class UsuarioService {
    private usuarios : any [] = [];
    
    salvar(usuario){
        this.usuarios.push(usuario)

    }
    listarUsuario(){
        return this.usuarios
    }
}
