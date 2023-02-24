import React, { useContext, useState } from 'react'
import { Context } from '../App'



function Form() {
    const {dispatch} = useContext(Context)
    const [value,setValue] = useState('')
    const addTodo = () => {
        if(value.trim()){
            const todo = {
                text:value,
                isChecked:false,
                id:Math.random()
            }
            dispatch({type:'ADD_TODO',payload:todo})
            setValue('')
        }
    }

    const deleteChecked = () => {
        dispatch({type:'DELETE_CHECKED'})
    }
    
  return (
    <div>
      <form onSubmit={e=>e.preventDefault()}>
      <input 
           style={{padding:10+'px'}}
           type="text" 
           placeholder='Add Todo' 
           value={value} 
           onChange={(e)=>setValue(e.target.value)} 
        />
        <button style={{padding:10+'px'}} onClick={addTodo}>ADD</button>
        <button style={{padding:10+'px'}} onClick={deleteChecked}>Delete Checked</button>
      </form>
    </div>
  )
}

export default Form