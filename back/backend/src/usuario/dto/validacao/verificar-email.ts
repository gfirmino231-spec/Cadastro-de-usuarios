import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsuarioService } from "../../usuario.service";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({async:true})
export class VerificarEmail implements ValidatorConstraintInterface{
    constructor(private usuarioService: UsuarioService){}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean>  {
        const usuarioComEmailExiste = await this.usuarioService.existeComEmail(value);
        return !usuarioComEmailExiste;
    }
    
}
export const emailEhUnico = (opcoesDeValidacao:ValidationOptions)=>{
    return(objeto: object, propriedade: string) =>{
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesDeValidacao,
            constraints: [],
            validator:VerificarEmail    
        })
    }

}