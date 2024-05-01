import {useMemo, useState} from 'react'
import './App.css'

interface Todo {
    id: number;
    text: string;
    isComplete: boolean;
}

let id = 1

function App() {

    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputText, setInputText] = useState<string>('');
    const [filterType, setFilterType] = useState<number>(0);


    const handleDeleteTodo = (id: number): void => {
        const filteredTodos = todos.filter(todo => todo.id !== id);
        setTodos(filteredTodos);
    };

    const handleClickTodoText = (id: number): void => {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
        );
        setTodos(updatedTodos);
    };

    const handleFilter=(type: number)=>{
        setFilterType(type)
    }

    const submit=async ()=>{

        const response = await fetch("http://localhost:3000/api");
        console.log(response,'response')
        const html = await response.text(); // HTML string
        console.log(html,'html')

        // fetch('http://localhost:3000/',{ mode: 'no-cors'}).then((res)=>{
        //     console.log(res,'rrr')
        //
        //     console.log(aaa,'aaa')
        // }).catch(err=>{
        //     console.log(err,'eeee')
        // })
        if (inputText.trim() !== '') {
            const newTodo: Todo = {
                id: id++,
                text: inputText,
                isComplete: false,
            };
            setTodos([...todos, newTodo]);
            setInputText('');
        }
    }

    const filteredData = useMemo(() => {
        let updatedTodos: Todo[] = [];
        if (filterType === 0) {
            updatedTodos = todos;
        } else if (filterType === 1) {
            updatedTodos = todos.filter(todo => todo.isComplete);
        } else if (filterType === 2) {
            updatedTodos = todos.filter(todo => !todo.isComplete);
        }
        return updatedTodos
    }, [filterType, todos]);


    return (
        <div className="border py-4 px-8 flex flex-col justify-between" style={{width: 500, height: 400, borderRadius: '3%'}}>
            <div className="flex justify-between mb-2">
                <input className="border rounded-3xl border-amber-200"
                       value={inputText}
                       onChange={(e)=>setInputText(e.target.value)}
                />
                <button className="btn form__submit-btn" type="submit"  onClick={submit}>Add</button>
            </div>
            <div style={{overflow: "scroll", overflowX: 'hidden', flex: 1, marginBottom: 8}}>
                {
                    filteredData.map((item)=>{
                        return (
                            <div className="item flex justify-between items-center py-2">
                                <div className="content" onClick={()=>handleClickTodoText(item.id)}>{item.text}</div>
                                <button onClick={()=>handleDeleteTodo(item.id)}>
                                    {item.isComplete ? 'V':'X'}
                                </button>
                            </div>
                        )
                    })
                }
            </div>
            <div className="flex justify-between">
                <button
                    className="btn filters__btn filters__btn--all"
                    onClick={()=>handleFilter(0)}
                >
                    All
                </button>
                <button
                    className="btn filters__btn filters__btn--complete"
                    onClick={()=>handleFilter(1)}
                >
                    Complete
                </button>
                <button
                    className="btn filters__btn filters__btn--incomplete"
                    onClick={()=>handleFilter(2)}
                >
                    Incomplete
                </button>
            </div>
        </div>
    )
}

export default App