import api from './api';

export const UsuarioService = {
  listar: () => api.get('/usuarios'),

  criar: (dados: { nome: string; email: string }) =>
    api.post('/usuarios', dados),

  atualizar: (id: string, dados: any) =>
    api.put(`/usuarios/${id}`, dados),

  deletar: (id: string) =>
    api.delete(`/usuarios/${id}`),
};