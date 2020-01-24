import React, {useState} from 'react'
import Rest from '../utils/rest'

const baseUrl = 'https://mymoney-herbst.firebaseio.com/'
const { useGet, usePost, useDelete, usePatch } = Rest(baseUrl)

const Movements = ({match}) => {
    const data = useGet(`movimentacoes/${match.params.date}`)
    const dataMonths = useGet(`meses/${match.params.date}`)
    const [patchData, patch] = usePatch()
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

    const sleep = time => new Promise(
        resolve => setTimeout(resolve, time)
    )

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
            await sleep(500)
            dataMonths.refetch()
        }
    }

    const removerMovimentacao = async(id) => {
        await remover(`movimentacoes/${match.params.date}/${id}`)
        data.refetch()
        await sleep(500)
        dataMonths.refetch()
    }

    const alterarPrevisaoEntrada = (evt) => {
        //console.log(evt.target.value)
        patch(`meses/${match.params.date}`, { previsao_ent: evt.target.value})
    }    

    const alterarPrevisaoSaida = (evt) => {
        //console.log(evt.target.value)
        patch(`meses/${match.params.date}`, { previsao_sai: evt.target.value})
    }    

    return (
        <div className='container'>
            <h1>Movimentações</h1>
            {
                !dataMonths.loading && 
                    <div>
                        Previsão entrada: {dataMonths.data.previsao_ent} <input type='text' onBlur={alterarPrevisaoEntrada}/> / Previsão saída: {dataMonths.data.previsao_sai}  <input type='text' onBlur={alterarPrevisaoSaida}/>
                        <br/>
                        Entradas: {dataMonths.data.entradas} / Saídas: {dataMonths.data.saidas} 
                        <br/>

                        <pre>{JSON.stringify(dataMonths)}</pre>
                    </div>                    
            }    
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