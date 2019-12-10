import React, {useState, useEffect} from 'react'

import axios from 'axios'

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

function App() {
  const [data, setData] = useState({
    loading: true,
    data: {}
  })
  useEffect(() => {
    axios
      .get(url)
      .then(res => {
        setData({
          loading: false,
          data: res.data
        })
      })
  }, [])

  return (
    <div>
      <h1>My Money</h1>
      {JSON.stringify(data)}
      {data.loading && <p>Carregando</p>}
    </div>
  )
}

export default App
