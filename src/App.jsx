import { useState } from "react";
import "./styles.css";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTotdos, setIncompleteTotdos] = useState([]);
  const [completeTotdos, setCompleteTotdos] = useState([]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTotdos, todoText];
    setIncompleteTotdos(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    const newTodos = [...incompleteTotdos];
    newTodos.splice(index, 1);
    setIncompleteTotdos(newTodos);
  };

  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTotdos];
    newIncompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeTotdos, incompleteTotdos[index]];
    setIncompleteTotdos(newIncompleteTodos);
    setCompleteTotdos(newCompleteTodos);
  };

  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTotdos];
    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteTotdos, completeTotdos[index]];
    setCompleteTotdos(newCompleteTodos);
    setIncompleteTotdos(newIncompleteTodos);
  };

  return (
    <>
      <div className="input-area">
        <input
          placeholder="TODOを入力"
          value={todoText}
          onChange={onChangeTodoText}
        />
        <button onClick={onClickAdd}>追加</button>
      </div>
      <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {incompleteTotdos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickComplete(index)}>完了</button>
                <button onClick={() => onClickDelete(index)}>削除</button>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {completeTotdos.map((todo, index) => {
            return (
              <div key="todo" className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickBack(index)}>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
