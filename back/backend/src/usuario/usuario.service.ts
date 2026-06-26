import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioEntity } from './usuarioEntity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsuarioService {
    constructor(private prisma: PrismaService) {}

    async salvar(usuario: UsuarioEntity) {
        return this.prisma.user.create({
            data: {
                nome: usuario.nome,
                email: usuario.email,
                idade: usuario.idade,
            },
        });
    }

    async listarUsuario() {
        return this.prisma.user.findMany();
    }

    async existeComEmail(email: string) {
        const possivelUsuario = await this.prisma.user.findUnique({ where: { email } });
        return possivelUsuario !== null;
    }

    private async buscarPorId(id: number) {
        const possivelUsuario = await this.prisma.user.findUnique({ where: { id } });
        if (!possivelUsuario) {
            throw new NotFoundException('Usuario não encontrado');
        }
        return possivelUsuario;
    }

    async atualizar(id: number, dadosDeAtualizacao: Partial<UsuarioEntity>) {
        await this.buscarPorId(id);

        if (dadosDeAtualizacao.email) {
            const usuarioComEmail = await this.prisma.user.findUnique({ where: { email: dadosDeAtualizacao.email } });
            if (usuarioComEmail && usuarioComEmail.id !== id) {
                throw new BadRequestException('O e-mail já pertence a outro usuario!');
            }
        }

        return this.prisma.user.update({
            where: { id },
            data: dadosDeAtualizacao,
        });
    }

    async remove(id: number) {
        await this.buscarPorId(id);
        return this.prisma.user.delete({ where: { id } });
    }
}
