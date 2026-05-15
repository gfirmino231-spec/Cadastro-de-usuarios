import './style.css'
import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa'

function Home() {
  const [formulario, setFormulario] = useState({ nome: '', idade: '', email: '' });

  const pegarDados =  (evento:React.ChangeEvent<HTMLInputElement>) =>{
    setFormulario({...formulario, [evento.target.name]:evento.target.value});
  }
  const [clicar, setClicar] = useState<{nome: string, idade: string, email: string}[]>([]);
  const aoClicar = () =>{
    setClicar([...clicar , formulario])
  }

  return (
  <>
  
    

   <div className='box'>
      <h1 className='titulo'>Cadastro de usuários</h1>

      
        <input className='inputNome' value={formulario.nome} onChange={pegarDados} name='nome' type="text" id="nome" placeholder="Seu Nome"></input>

        <input className='inputEmail' value={formulario.email} onChange={pegarDados} name='email' type="text" id="email" placeholder="Seu email."></input>
      
        <input className='inputIdade' value={formulario.idade} onChange={pegarDados} name='idade' type="text" id="number" placeholder="Sua idade"></input>

        <button onClick={aoClicar} className='botao'>
          <p className='paragrafoBotao'>
            Cadastrar
          </p>
          </button>     
      
        
      
    </div>

    {clicar.map((usuario)=>(
      <div className='usuariosCadastrados'>
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
        <FaTrash/>
      </div>
    ))}
    
  </>
)  
}



   
export default Home