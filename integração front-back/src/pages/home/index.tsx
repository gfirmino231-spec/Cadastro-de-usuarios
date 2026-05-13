import './style.css'
import  { useState } from 'react';

function Home() {

  

  return (
  <>
  

   <div className='box'>
      <h1 className='titulo'>Cadastro de usuários</h1>

      
        <input className='inputNome' type="text" id="nome" placeholder="Seu Nome"></input>

        <input className='inputEmail' type="text" id="email" placeholder="Seu email."></input>
      
        <input className='inputIdade' type="number" id="idade" placeholder="Sua idade"></input>

        <button className='botao'>
          <p className='paragrafoBotao'>
            Cadastrar
          </p>
          </button>     
      
        
      
    </div>
    
  </>
)  
}


   
export default Home