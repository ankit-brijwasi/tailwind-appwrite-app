import useTodo from "../hooks/useTodo";
import TodoForm from "./TodoForm";
import Todos from "./Todos";
import Loading from "./utils/Loading";

function Dashboard() {
  const [{ loading, todos }] = useTodo();
  return (
    <div className="min-h-screen flex divide-x">
      <div className="w-2/5">
        <TodoForm />
      </div>
      <div className="w-3/5">
        {loading ? (
          <Loading />
        ) : (
          <div className="m-2.5">
            {todos.documents.reverse().map((todo, i) => (
              <Todos key={todo.$id} {...todo} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
