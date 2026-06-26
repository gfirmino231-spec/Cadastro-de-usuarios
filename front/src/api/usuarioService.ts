import api from './api';

export const UsuarioService = {
  listar: () => api.get('/usuarios'),

  criar: (dados: { nome: string; email: string; idade: number }) =>
    api.post('/usuarios', dados),

  atualizar: (id: number, dados: any) =>
    api.put(`/usuarios/${id}`, dados),

  deletar: (id: number) =>
    api.delete(`/usuarios/${id}`),
};