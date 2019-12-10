import React from 'react'

import useGet from './useGet'

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

const url = 'https://mymoney-herbst.firebaseio.com/movimentacoes/2019-08.json'
const url2 = 'http://httpbin.org/ip'

function App() {
  const data = useGet(url)
  const data2 = useGet(url2)
  return (
    <div>
      <h1>My Money</h1>
      {JSON.stringify(data)}
      {data.loading && <p>Carregando</p>}
      <pre>{JSON.stringify(data2)}</pre>
    </div>
  )
}

export default App
