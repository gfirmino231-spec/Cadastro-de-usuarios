import './style.css'
import React, { useEffect, useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa'
import { UsuarioService } from '../../api/usuarioService';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  idade: number;
}

function Home() {
  const [formulario, setFormulario] = useState({ nome: '', idade: '', email: '' });
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [erro, setErro] = useState('');
  const [idEmEdicao, setIdEmEdicao] = useState<number | null>(null);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    const resposta = await UsuarioService.listar();
    setUsuarios(resposta.data);
  }

  const pegarDados = (evento: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evento.target;

    if (name === 'idade' && !/^\d*$/.test(value)) {
      return;
    }

    setFormulario({ ...formulario, [name]: value });
  }

  const aoClicar = async () => {
    setErro('');

    const dados = {
      nome: formulario.nome,
      email: formulario.email,
      idade: Number(formulario.idade),
    };

    try {
      if (idEmEdicao !== null) {
        const resposta = await UsuarioService.atualizar(idEmEdicao, dados);
        setUsuarios(usuarios.map((usuario) => usuario.id === idEmEdicao ? resposta.data.usuario : usuario));
        setIdEmEdicao(null);
      } else {
        const resposta = await UsuarioService.criar(dados);
        setUsuarios([...usuarios, resposta.data.usuario]);
      }

      setFormulario({ nome: '', idade: '', email: '' });
    } catch (erroRequisicao: any) {
      const mensagem = erroRequisicao?.response?.data?.message;
      setErro(Array.isArray(mensagem) ? mensagem.join(', ') : mensagem ?? 'Erro ao salvar usuário');
    }
  }

  const iniciarEdicao = (usuario: Usuario) => {
    setErro('');
    setIdEmEdicao(usuario.id);
    setFormulario({ nome: usuario.nome, email: usuario.email, idade: String(usuario.idade) });
  }

  const cancelarEdicao = () => {
    setErro('');
    setIdEmEdicao(null);
    setFormulario({ nome: '', idade: '', email: '' });
  }

  const deletarUsuario = async (id: number) => {
    await UsuarioService.deletar(id);
    setUsuarios(usuarios.filter((usuario) => usuario.id !== id))
  }

  return (
    <>
      <div className='box'>
        <h1 className='titulo'>Cadastro de usuários</h1>

        <input className='inputNome' value={formulario.nome} onChange={pegarDados} name='nome' type="text" id="nome" placeholder="Seu Nome"></input>

        <input className='inputEmail' value={formulario.email} onChange={pegarDados} name='email' type="text" id="email" placeholder="Seu email."></input>

        <input className='inputIdade' value={formulario.idade} onChange={pegarDados} name='idade' type="text" inputMode="numeric" id="idade" placeholder="Sua idade"></input>

        {erro && <p className='mensagemErro'>{erro}</p>}

        <button onClick={aoClicar} className='botao'>
          <p className='paragrafoBotao'>
            {idEmEdicao !== null ? 'Atualizar' : 'Cadastrar'}
          </p>
        </button>

        {idEmEdicao !== null && (
          <button onClick={cancelarEdicao} className='botaoCancelar'>
            <p className='paragrafoBotao'>
              Cancelar
            </p>
          </button>
        )}

      </div>

      {usuarios.map((usuario) => (
        <div className='usuariosCadastrados' key={usuario.id}>
          <div className='informacoesCadastro'>
            <p className='usuarioNome'>
              Nome: {usuario.nome}
            </p>
            <p className='usuarioEmail'>
              Email: {usuario.email}
            </p>
            <p className='usuarioIdade'>
              Idade: {usuario.idade}
            </p>
          </div>
          <div className='botoesDeAcao'>
            <button className='botaoDeEditar' onClick={() => iniciarEdicao(usuario)}>
              <FaEdit />
            </button>
            <button className='botaoDeExcluir' onClick={() => deletarUsuario(usuario.id)}>
              <FaTrash />
            </button>
          </div>
        </div>
      ))}

    </>
  )
}

export default Home
