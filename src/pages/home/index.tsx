import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Checkbox, IconButton, Input, Switch } from '@material-tailwind/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Todo } from '@/types/Todo'
//
//
//
const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [todo, setTodo] = useState<string>('')

  const getTodoList = () => {
    axios
      .get<Todo[]>('http://localhost:8000/todos')
      .then((response) => {
        setTodos(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }
  const postTodo = () => {
    axios
      .post('http://localhost:8000/todos', { title: todo, content: todo, completed: false })
      .then((response) => {
        console.log(response)
        getTodoList()
      })
    setTodo('')
  }
  useEffect(() => {
    console.log(todos)
  }, [todos])

  useEffect(() => {
    getTodoList()
  }, [])
  //
  //
  //ここから下はリターンの中身
  return (
    <div className='bg-blue-100 h-screen pt-5'>
      <div className='text-black mt-5 text-2xl font-bold text-center'>TODOリスト</div>
      <div className='flex justify-center space-x-2 mt-3'>
        <div>
          <Input
            className='bg-white w-72'
            label='TODOを入力してください'
            value={todo}
            onChange={(e) => {
              setTodo(e.target.value)
            }}
          />
        </div>
        <div>
          <Button
            className='mt-1 py-2 px-2'
            onClick={() => {
              if (todo.trim() !== '') {
                postTodo()
                setTodo('')
              }
            }}
          >
            作成
          </Button>
        </div>
      </div>
      <div className='lg:w-1/4 lg:mx-auto mx-3 mt-8 bg-blue-100 '>
        <div className='text-black text-center my-5 divide-y divide-gray-400 divide-dashed'>
          {todos.map((todo) => {
            return (
              <div key={todo.id} className='flex items-center mt-2'>
                {/* チェックボックスをクリックしたらtodoのcompletedをtrueにするためにpatchリクエストをする処理 */}
                <div>
                  <Checkbox
                    id={String(todo.id)}
                    checked={todo.completed}
                    onChange={() => {
                      axios
                        .patch(`http://localhost:8000/todos/${todo.id}`, {
                          completed: !todo.completed,
                        })
                        .then((response) => {
                          console.log(response)
                          getTodoList()
                        })
                    }}
                  />
                </div>
                【{todo.id}】 {todo.title}
                <div
                  className='ml-auto'
                  onClick={() => {
                    axios.delete(`http://localhost:8000/todos/${todo.id}`).then((response) => {
                      console.log(response)
                      getTodoList()
                    })
                  }}
                >
                  {/* swichがtureの場合のみButtonコンポーネントを表示させる */}
                  {todo.completed && (
                    <Button className='py-0.5 px-0.5' color='green'>
                      <div className='text-xs'>完了</div>
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

{
  {
    {
      {
        {
        }
      }
    }
  }
}

export default Home
