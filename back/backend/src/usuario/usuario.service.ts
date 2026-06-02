import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './usuarioEntity';
import { error } from 'console';

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

    private buscarPorId(id:string){
        const possivelUsuario = this.usuarios.find(
            usuarioSalvo => usuarioSalvo.id === id
        );

        if(!possivelUsuario){
            throw new error('Usuario não encontrado')
        }
        return possivelUsuario
    }
    async atualizar(id:string, dadosDeAtualizacao:Partial<UsuarioEntity>){
        const usuario = this.buscarPorId(id)

        Object.entries(dadosDeAtualizacao).forEach(([chave,valor])=>{
            if(chave === 'id'){
                return;
            }
            usuario[chave] = valor
        })
        return usuario;
    }

    async remove(id:string){
        const usuario = this.buscarPorId(id);
        this.usuarios = this.usuarios.filter(
            usuarioSalvo => usuarioSalvo.id !== id
        );

        return usuario;
    }

}


