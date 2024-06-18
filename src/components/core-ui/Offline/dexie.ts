import Dexie, { type EntityTable } from "dexie";
import { formDataToJsonData } from "./utils";
import { useContext } from "react";
import { OfflineTaskContext } from "./OfflineTaskManager";

const TASK_STATUS_DEFAULT: TaskStatus = {
  loading: false,
  saved: false,
  failed: false,
};

export interface Task {
  id: string;
  url: string;
  data: { [key: string]: object | string | number | boolean };
  method: "post" | "put";
  status: TaskStatus;
  type: string;
  owner: string;
}

export interface TaskStatus {
  saved: boolean;
  loading: boolean;
  failed: boolean;
}

export interface TaskToAdd {
  data: FormData;
  url: string;
  type: string;
  owner: string;
  method: Task["method"];
}


const db = new Dexie("OfflineDatabase") as Dexie & {
  tasks: EntityTable<Task, "id">;
};

// Schema declaration:
db.version(1).stores({
  tasks: "++id, owner",
});

const addTask = async (taskToAdd: TaskToAdd) => {
  db.tasks.add({
    ...taskToAdd,
    data: await formDataToJsonData(taskToAdd.data),
    status: TASK_STATUS_DEFAULT,
  });
};

const updateTask = async ({ id, ...restTask }: Task) => {
  db.tasks.where({ id }).modify(restTask);
};

const deleteAllTasks = async () => {
  db.tasks.clear();
};

const deleteOwnTasks = (owner: string) => {
  db.tasks.where("owner").equals(owner).delete();
};

const addOnwTask = (owner: string, taskToAdd: Omit<TaskToAdd, "owner">) => {
  return addTask({
    ...taskToAdd,
    owner,
  });
};

const deleteTask = async (id: Task["id"]) => {
  db.tasks.delete(id);
};

const useOfflineTool = () => {
  const offlineContext = useContext(OfflineTaskContext);

  return {
    addOwnTask: (taskToAdd: Omit<TaskToAdd, "owner">) =>
      addOnwTask(offlineContext.owner, taskToAdd),
    deleteOwnTasks: () => deleteOwnTasks(offlineContext.owner),
    updateTask,
  };
};

export type {};
export {
  db,
  addTask,
  updateTask,
  deleteAllTasks,
  deleteTask,
  useOfflineTool,
  deleteOwnTasks,
};
