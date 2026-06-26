export class ListaUsuarioDTO {
    constructor(
        readonly id: number,
        readonly nome: string,
        readonly email: string,
        readonly idade: number,
    ){}
}