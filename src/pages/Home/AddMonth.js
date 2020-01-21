import React from 'react'

const AddMonth = () => {
    return (
        <>
        <h2>Adicionar Mês</h2>

        <select name="year" id="year">
          <option value="2019">2019</option>
          <option value="2020">2020</option>
        </select>
        
        <select name="month" id="month">
          <option value="01">01</option>
          <option value="02">02</option>
        </select>

        <button>Adicionar Mês</button>        
        </>
    )
}

export default AddMonth