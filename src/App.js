import React from 'react'

//import useGet from './useGet'
//import usePost from './usePost'
//import useDelete from './useDelete'

//import axios from 'axios'

import Rest from './rest'

/*
axios
  .get('https://mymoney-herbst.firebaseio.com/valores.json')
  .then((res) => {
    console.log(res.data)
  })

axios
  .post('https://mymoney-herbst.firebaseio.com/valores.json', {
    segundo: 'Herbst'
  })
  .then((res) => {
    console.log(res.data)
  })
*/

//const url = 'https://mymoney-herbst.firebaseio.com/movimentacoes/2019-08.json'
const url = 'movimentacoes/2019-08'
//const url2 = 'http://httpbin.org/ip'

const baseUrl = 'https://mymoney-herbst.firebaseio.com/'

const { useGet, usePost, useDelete } = Rest(baseUrl)

function App() {
  const data = useGet(url)
  //const data2 = useGet(url2)

  const [postData, post] = usePost(url)
  const [deleteData, remove] = useDelete()

  const doRemove = () => {
    remove(url+ '/-Lz3FU82A0KhQQt2RIcC')
  }

  const saveNew = () => {
    post({valor:10, descricao: 'olá'})
  }


  return (
    <div>
      <h1>My Money</h1>
      {JSON.stringify(data)}
      {data.loading && <p>Carregando</p>}
      <br/>
      <button onClick={saveNew}>Salvar</button>
      <pre>{JSON.stringify(postData)}</pre>
      <button onClick={doRemove}>Deletar</button>
      <pre>{JSON.stringify(deleteData)}</pre>
    </div>
  )
}

export default App
