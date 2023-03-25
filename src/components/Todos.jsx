import moment from "moment";
import { Permission, Role } from "appwrite";
import { useState } from "react";

import { databases } from "../appwrite/appwriteConfig";
import useAuth from "../hooks/useAuth";


function Todos(props) {
  const [{ user }] = useAuth();
  const [checked, setChecked] = useState(props.is_completed);

  const handleClick = async (taskId) => {
    setChecked(!checked);
    await databases.updateDocument(
      process.env.REACT_APP_DATABASE_ID,
      process.env.REACT_APP_TODO_COLLECTION_ID,
      taskId,
      { is_completed: !checked },
      [
        Permission.read(Role.user(user.$id)),
        Permission.update(Role.user(user.$id)),
        Permission.delete(Role.user(user.$id)),
      ]
    );
  };

  return (
    <div
      className={`border p-4 rounded hover:shadow-sm hover:cursor-pointer m-auto mb-4 w-3/4 ${
        checked ? "opacity-40" : ""
      }`}
      onClick={() => handleClick(props.$id)}
    >
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl">{props.title}</h2>
          <p
            title={moment(props.deadline).toString()}
            className="text-sm text-gray-500 text-xs font-semibold"
          >
            Deadline: {moment(props.deadline).fromNow()}
          </p>
        </div>
        <div className="self-center">
          <input
            type={"checkbox"}
            checked={checked}
            className="hover:cursor-pointer"
            onChange={() => handleClick(props.$id)}
          />
        </div>
      </div>
    </div>
  );
}

export default Todos;
