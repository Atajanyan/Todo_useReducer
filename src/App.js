import { createContext, useEffect, useReducer, useRef, useState } from 'react';
import './App.css';
import Form from './components/Form';
import TodoItem from './components/TodoItem';
export const Context = createContext()


const ACTION_TYPES = {
  ADD_TODO:'ADD_TODO',
  DELETE_TODO:'DELETE_TODO',
  DELETE_CHECKED:'DELETE_CHECKED',
  IS_CHECKED_TODO:'IS_CHECKED_TODO',
  EDIT_TODO:'EDIT_TODO',
}

export const reducer = (state,action) => {
   switch (action.type) {
    case ACTION_TYPES.ADD_TODO:
      return state = [...state,action.payload]

    case ACTION_TYPES.DELETE_TODO:
      return state = state.filter(item=>item.id !== action.payload)   

    case ACTION_TYPES.DELETE_CHECKED:
      return state = state.filter(item=>!item.isChecked)

    case ACTION_TYPES.IS_CHECKED_TODO:
      return state = state.map(item=>{
        if(item.id === action.payload.id){
          return action.payload
        }
        return item
      })

      case ACTION_TYPES.EDIT_TODO:
        return state = state.map(item=>{
          if(item.id === action.payload.id){
            return action.payload
          }
          return item
        })
    default:
     return state
   }
}


function App() {
  const popup = useRef('')
  const [state,dispatch] = useReducer(reducer,[])
  const [item,setItem] = useState()
  const [value,setValue] = useState('')
  const [isShow,setIsShow] = useState(false)
  const checked = state.filter(e=>e.isChecked).length


  const handleEdit = (item) => {
    setItem(item)
    setIsShow(true)
    setTimeout(() =>popup.current.focus());
  }

  const handleEditOk = (item) => {
    if(value.trim()){
      dispatch({type:'EDIT_TODO',payload:{...item,text:value}})
      setValue('')
      setIsShow(false)
    }else{
      alert('Lracreq kam sexmeq  Cancel')
    }
  }

  const handleEditCancel = () => {
    setValue('')
    setIsShow(false)
  }

  return (
    <Context.Provider value={{state,dispatch,handleEdit,setItem}}>

      <div onClick={()=>setIsShow(false)} className={isShow?'disable':'disableBlock'}></div>
    <div className="App">
      <Form/>
      {
        state.map(e=><div key={Math.random()}>
          <TodoItem item={e}/>
        </div>)
      }
      <div className='checked'>Completed:  {checked}/{state.length}</div>
    <div className={isShow?'popup':'block'}>
      <h3>Edit Text Todo</h3>
      <input
        ref={popup}
        style={{padding:8+'px'}}
        value={value}
        onChange={(e)=>setValue(e.target.value)}
        />
      <div>
      <button onClick={()=>handleEditOk(item)}>Ok</button>
      <button onClick={handleEditCancel}>Cancel</button>
      </div>
    </div>
    </div>
    </Context.Provider>
  );
}

export default App;
