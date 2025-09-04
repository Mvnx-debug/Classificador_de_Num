import { useState } from 'react'
import './App.css'

function App() {
  const [numero, setNumero] = useState("");
  const [resultado, setResultado] = useState(null);
  
  const enviarNumero = async () => {
    try{
    
    const resposta = await fetch("http://127.0.0.1:8000/classificar", {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({ valor: parseInt(numero)})
    });
    if (!resposta.ok){
      throw new Error('Erro de request');
    } 




    const dados = await resposta.json();
    setResultado(dados);
  } catch (erro){
    console.error('Erro', erro);
    alert('Erro ao conectar com a api. ver se o servidor está rodando')

    }
  };
  
  return (
    <div style={{ padding: '20px'}}>
      <h1>Classificador de numeros</h1>
      <input type="number" value={numero} onChange={(e) => setNumero(e.target.value)} placeholder='digite um número' />
      <button onClick={enviarNumero}> Enviar</button>
    
    {resultado && (
      <p>O número {resultado.numero} é <strong>{resultado.classificado}</strong></p>
    )}
   
   </div>
  )
}

export default App
