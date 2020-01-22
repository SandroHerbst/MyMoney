import React, {useState} from 'react'
import Rest from '../utils/rest'

const baseUrl = 'https://mymoney-herbst.firebaseio.com/'
const { useGet, usePost, useDelete } = Rest(baseUrl)

const Movements = ({match}) => {
    const data = useGet(`movimentacoes/${match.params.date}`)
    const [postData, salvar] = usePost(`movimentacoes/${match.params.date}`)
    const [removeData, remover] = useDelete()

    // controlled form
    const [descricao, setDescricao] = useState('')
    const [valor, setValor] = useState('')

    const onChangeDescricao = event => {
        setDescricao(event.target.value)
    }

    const onChangeValor = event => {
        setValor(event.target.value)
    }

    const salvarMovimentacao = async(e) => {
        e.preventDefault()

        if (!isNaN(valor) && valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0) {
            await salvar({
                descricao,
                valor: parseFloat(valor)
            })        
            setDescricao('')
            setValor('')
            data.refetch()
        }
    }

    const removerMovimentacao = async(id) => {
        await remover(`movimentacoes/${match.params.date}/${id}`)
        data.refetch()
    }

    return (
        <div className='container'>
            <h1>Movimentações</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th className='text-right'>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    { data.data && Object
                        .keys(data.data)
                        .map(movement => {
                            return (
                                <tr key={movement}>
                                    <td>{data.data[movement].descricao}</td>
                                    <td className='text-right'>
                                        {data.data[movement].valor}
                                        <button className='btn btn-danger ml-2' onClick={() => removerMovimentacao(movement)}>-</button>
                                    </td>                                    
                                </tr>
                            )
                        })
                    }

                    <tr>
                        <td>
                            <input type="text" value={descricao} onChange={onChangeDescricao}/>
                        </td>
                        <td className='text-right'>
                            <input type="text" value={valor} onChange={onChangeValor}/> 
                            <button className='btn btn-success ml-2' onClick={salvarMovimentacao}>+</button> 
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>      
    )
  }

export default Movements