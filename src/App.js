import React from 'react'

import Header from './elements/Header'
import Months from './Months'
import AddMonth from './AddMonth'

function App() {

  return (
    <div>
      <Header/>     
      <div className='container'>      
        <AddMonth/>
        <Months/>      
        <br/>
      </div>
    </div>
  )
}

export default App
