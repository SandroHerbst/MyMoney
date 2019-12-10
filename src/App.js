import React, {useState, useEffect, useReducer} from 'react'

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

// função pura
const reducer = (state, action) => {
  // manipular meu estado
  if (action.type === 'REQUEST') {
    return {
      ...state,
      loading: true
    }
  }
  if (action.type === 'SUCCESS') {
    return {
      ...state,
      loading: false,
      data: action.data
    }
  }
  return state
}

function App() {
  const [data, dispatch] = useReducer(reducer, {
    loading: true,
    data: {}
  })
  useEffect(() => {
    dispatch({type: 'REQUEST'})
    axios
      .get(url)
      .then(res => {
        dispatch({type: 'SUCCESS', data: res.data})
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
