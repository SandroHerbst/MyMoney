import React from 'react'
import {Link} from 'react-router-dom'
import Rest from '../../utils/rest'

const baseUrl = 'https://mymoney-herbst.firebaseio.com/'
const { useGet } = Rest(baseUrl)

const Months = () => {
    const data = useGet('meses')

    if (data.loading) {
        return (<span>Carregando...</span>)
    }
    if (data.data) {
        return (
            <table className='table'>
            <thead>
                <tr>
                <th>Mês</th>
                <th>Previsão Entrada</th>
                <th>Entrada</th>
                <th>Previsão Saída</th>
                <th>Saída</th>
                </tr>              
            </thead>
            <tbody>
                {
                Object
                    .keys(data.data)
                    .map(mes => {
                    return (
                        <tr key={mes}>
                        <td><Link to={`/movements/${mes}`}>{mes}</Link></td>
                        <td>{data.data[mes].previsao_ent}</td>
                        <td>{data.data[mes].entradas}</td>
                        <td>{data.data[mes].previsao_sai}</td>
                        <td>{data.data[mes].saidas}</td>
                        </tr>
                    )
                    })
                }
            </tbody>
            </table>
        )
    }
    return null
}

export default Months