import { Permission, Role } from "appwrite";
import { useState } from "react";
import { v4 } from "uuid";
import { databases } from "../appwrite/appwriteConfig";
import useAuth from "../hooks/useAuth";
import useTodo from "../hooks/useTodo";

function TodoForm() {
  const [{ user }] = useAuth();
  const dispatch = useTodo()[1];

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const [adding, setAdding] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setAdding(true);
    const response = await databases.createDocument(
      process.env.REACT_APP_DATABASE_ID,
      process.env.REACT_APP_TODO_COLLECTION_ID,
      v4(),
      {
        title,
        description: description ? description : null,
        deadline: new Date(deadline).toUTCString(),
        is_completed: false
      },
      [
        Permission.read(Role.user(user.$id)),
        Permission.update(Role.user(user.$id)),
        Permission.delete(Role.user(user.$id))
      ]
    );
    dispatch({ type: "createTodo", todo: response });
    setAdding(false);

    setTitle("");
    setDescription("");
    setDeadline("");
  };

  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 drop-shadow-lg">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center text-2xl font-bold">Add New Item</div>
          <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <div className="mt-1">
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:opacity-30"
                  disabled={adding}
                  autoFocus
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="deadline"
                className="block text-sm font-medium text-gray-700"
              >
                Deadline
              </label>
              <div className="mt-1">
                <input
                  id="deadline"
                  type={"datetime-local"}
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:opacity-30"
                  disabled={adding}
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description (Optional)
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-32 disabled:opacity-30"
                  disabled={adding}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 enabled:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75"
                disabled={adding}
              >
                {adding ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TodoForm;
