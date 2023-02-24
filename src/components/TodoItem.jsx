import React, { useContext } from 'react'
import { Context } from '../App'

const TodoItem = ({item}) => {
    const {dispatch,handleEdit} = useContext(Context)

    const handleChecked = (e) => {
        dispatch({type:'IS_CHECKED_TODO',payload:{...item,isChecked:e.target.checked}})
    }

    const deletTodo = () => {
        dispatch({type:'DELETE_TODO',payload:item.id})
    }

  return (
    <>
    <div className='todoItem'>
        <input type="checkbox" checked={item.isChecked} onChange={(e)=>handleChecked(e)}/>
        {item.text}
        <div>
            <button onClick={()=>handleEdit(item)}>Edit</button>
            <button onClick={deletTodo}>x</button>
        </div>
    </div>  
    </>
  )
}

export default TodoItem