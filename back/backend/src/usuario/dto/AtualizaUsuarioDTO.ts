import {IsEmail, IsNotEmpty, IsInt,Min,Max} from 'class-validator'

export class AtualizaUsuarioDTO{
    @IsNotEmpty({message:"O nome não pode ser vazio"})
    nome!: string;

    @IsEmail(undefined,{message: "E-mail Informado invalido"})
    email!: string;

  @IsInt({ message: 'A idade deve ser um número inteiro' })
  @Min(18, { message: 'Você deve ter pelo menos 18 anos de idade' })
  @Max(120, { message: 'Idade inválida' })
    idade!: number;

}