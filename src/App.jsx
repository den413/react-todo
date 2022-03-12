import { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteToDos } from "./components/IncompleteToDos";
import { CompleteTodos } from "./components/CompleteTodos";

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
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTotdos.length >= 5}
      />
      {incompleteTotdos.length >= 5 && (
        <p style={{ color: "red" }}>登録できるtodoは5個まで</p>
      )}

      <IncompleteToDos
        todos={incompleteTotdos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTotdos} onClickBack={onClickBack} />
    </>
  );
};
