import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Checkbox,
  IconButton,
  Input,
  Switch,
} from '@material-tailwind/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Todo } from '@/types/Todo';
//
//
//
const Todoapp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<string>('');

  const getTodoList = () => {
    axios
      .get<Todo[]>('/todos')
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const postTodo = () => {
    axios
      .post('/todos', {
        title: todo,
        content: todo,
        completed: false,
      })
      .then((response) => {
        console.log(response);
        getTodoList();
      });
    setTodo('');
  };
  useEffect(() => {
    console.log(todos);
  }, [todos]);

  useEffect(() => {
    getTodoList();
  }, []);
  //
  //
  //ここから下はリターンの中身
  return (
    <div className="h-screen bg-blue-100 pt-5">
      <div className="mt-5 text-center text-2xl font-bold text-black">
        TODOリスト
      </div>
      <div className="mt-3 flex justify-center space-x-2">
        <div>
          <Input
            className="w-72 bg-white"
            label="TODOを入力してください"
            value={todo}
            onChange={(e) => {
              setTodo(e.target.value);
            }}
          />
        </div>
        <div>
          <Button
            className="mt-1 px-2 py-2"
            onClick={() => {
              if (todo.trim() !== '') {
                postTodo();
                setTodo('');
              }
            }}
          >
            作成
          </Button>
        </div>
      </div>
      <div className="mx-3 mt-8 bg-blue-100 lg:mx-auto lg:w-1/4 ">
        <div className="my-5 divide-y divide-dashed divide-gray-400 text-center text-black">
          {todos.map((todo) => {
            return (
              <div key={todo.id} className="mt-2 flex items-center">
                {/* チェックボックスをクリックしたらtodoのcompletedをtrueにするためにpatchリクエストをする処理 */}
                <div>
                  <Checkbox
                    id={String(todo.id)}
                    checked={todo.completed}
                    onChange={() => {
                      axios
                        .patch(`/todos/${todo.id}`, {
                          completed: !todo.completed,
                        })
                        .then((response) => {
                          console.log(response);
                          getTodoList();
                        });
                    }}
                  />
                </div>
                【{todo.id}】 {todo.title}
                <div
                  className="ml-auto"
                  onClick={() => {
                    axios.delete(`/todos/${todo.id}`).then((response) => {
                      console.log(response);
                      getTodoList();
                    });
                  }}
                >
                  {/* swichがtureの場合のみButtonコンポーネントを表示させる */}
                  {todo.completed && (
                    <Button className="px-0.5 py-0.5" color="green">
                      <div className="text-xs">完了</div>
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Todoapp;
