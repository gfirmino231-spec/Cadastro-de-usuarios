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
    async existeComEmail(email:string){
        const possivelUsuario = this.usuarios.find(
            usuario => usuario.email === email

        );
        return possivelUsuario!== undefined
    }
}
