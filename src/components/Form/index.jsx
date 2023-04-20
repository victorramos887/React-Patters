import React from 'react';
import { useForm } from 'react-hook-form';
import MyTextField from '../MyTextField'
import CadastroNome from '../../routes/POST/CadastroNome'

const Form = () => {
  const ref = React.createRef();

  const {register, control, handleSubmit, watch} = useForm();
  const nome = watch("nome")

  const onSubmit = async (data) => {
    try {
      const response = await CadastroNome(data)

      console.log(response)

      }catch {
        console.log(data)
      }
    } 

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <MyTextField name='nome' label='Nome' control={control} id='nome' defaultValue='' ref={ref} type='text' {...register('nome')}/>
        
        <button disabled={!nome} type='submit'>Enviar</button>
      </form>
    </div>
  )
}

export default Form