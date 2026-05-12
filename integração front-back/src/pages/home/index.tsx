import './style.css'
function Home() {
  return (
  <>
   <div className='box'>
      <h1 className='titulo'>Cadastro de usuários</h1>
      
      <input type="text" name='nome' id='nome' placeholder='Seu Nome' />
      <input type="idade" name='idade' id='idade' placeholder='Sua Idade' />
      <input type="text" name="email" id="email" placeholder='Seu email' />
      
  </div>
    
  </>
)  
}


   
export default Home