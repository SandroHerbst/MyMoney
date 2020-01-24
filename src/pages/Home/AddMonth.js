import React, {useState, useRef} from 'react'
import {Redirect} from 'react-router-dom'

const minAno = 2019
const maxAno = 2022

const AddMonth = () => {
    const refYear = useRef()
    const refMonth = useRef()
    const [redir, setRedir] = useState('')
    const years = []
    const months = []
    for(let i = minAno; i<= maxAno; i++) {
      years.push(i)
    }
    for(let i = 1; i<= 12; i++) {
      months.push(i)
    }
    const zeroPad = num => {
      if(num < 10) {
        return '0' + num
      }
      return num
    }
    const viewMonth = () => {
      //console.log('ver mes', refYear.current.value, refMonth.current.value)
      setRedir(refYear.current.value + '-' + refMonth.current.value)
    }
    if(redir !== '') {
      return <Redirect to={`/movements/${redir}`} />
    }    
    return (
        <>
        <h2>Adicionar Mês</h2>

        <select ref={refYear} name="year" id="year">
          {
            years.map(year => <option key={year} value={year}>{year}</option>)
          }
        </select>
        
        <select ref={refMonth} name="month" id="month">
          {
            months
              .map(zeroPad)
              .map(month => <option key={month} value={month}>{month}</option>)
          }
        </select>

        <button onClick={viewMonth}>Adicionar Mês</button>        
        </>
    )
}

export default AddMonth