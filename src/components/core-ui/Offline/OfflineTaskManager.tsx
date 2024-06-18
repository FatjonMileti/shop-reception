import React, { createContext, useState } from "react";
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import SdStorageIcon from "@mui/icons-material/SdStorage";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import PauseIcon from "@mui/icons-material/Pause";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import ReplayIcon from "@mui/icons-material/Replay";

import { green } from "@mui/material/colors";
import { objectToFormData } from "./utils";

import s from "./offline.modules.scss";
import { useLiveQuery } from "dexie-react-hooks";
import { db, deleteOwnTasks, deleteTask, Task, updateTask } from "./dexie";

interface OfflineTaskManagerProps {
  requestHandlers: {
    post: (url: string, data: object) => Promise<void>;
    put: (url: string, data: object) => Promise<void>;
  };
  owner?: string;
  children: React.ReactNode;
}

export const OfflineTaskContext = createContext({ owner: "default" });

export const OfflineTaskManager = ({
  owner='default',
  children,
  requestHandlers,
}: OfflineTaskManagerProps) => {
  const [showDialog, setShowDialog] = useState(false);
  const [savingAll, setSavingAll] = useState(false);

  const tasks =
    useLiveQuery(() => {
      return db.tasks.where("owner").equals(owner).toArray();
    }) || [];

  const allSaved = tasks.length > 0 && tasks.every((task) => task.status.saved);

  const notSavedTaskFilter = (task: Task) => !task.status.saved;

  const updateTaskStatus = (task: Task, status: Task["status"]) => {
    updateTask({
      ...task,
      status,
    });
  };

  const saveTask = async (task: Task) => {
    try {
      updateTaskStatus(task, {
        ...task.status,
        loading: true,
      });

      const formData = objectToFormData(task.data);

      await requestHandlers[task.method](task.url, formData);

      updateTaskStatus(task, {
        ...task.status,
        loading: false,
        saved: true,
        failed: false,
      });
    } catch (err) {
      updateTaskStatus(task, {
        ...task.status,
        loading: false,
        failed: true,
      });
    }
  };

  const onSaveClick = async () => {
    setSavingAll(true);

    for (const task of tasks.filter(notSavedTaskFilter)) {
      await saveTask(task);
    }

    setSavingAll(false);
  };

  const onClearAllClick = () => {
    deleteOwnTasks(owner);
    setShowDialog(false);
  };

  return (
    <>
      {tasks.length > 0 && (
        <div
          style={{
            position: "absolute",
            zIndex: 999,
            top: "24px",
            right: "24px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Badge
              badgeContent={tasks.filter(notSavedTaskFilter).length}
              color="warning"
            >
              {savingAll && (
                <CircularProgress
                  size={68}
                  sx={{
                    color: green[500],
                    position: "absolute",
                    top: -6,
                    left: -6,
                    zIndex: 1,
                  }}
                />
              )}
              <Fab
                aria-label="add"
                onClick={() => setShowDialog(true)}
                disabled={tasks.length === 0}
              >
                {!allSaved && <SdStorageIcon />}
                {allSaved && <DoneAllIcon color="success" />}
              </Fab>
            </Badge>
          </Box>
        </div>
      )}

      <Dialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        className={s.offlineModal}
        classes={{
          paper: s.paper,
        }}
      >
        <DialogTitle>List of tasks</DialogTitle>
        <DialogContent
          classes={{
            root: s.content,
          }}
        >
          <List classes={{ root: s.list }}>
            {tasks.map((task) => (
              <ListItem className={s.taskListItem} key={task.id}>
                {!task.status.saved &&
                  !task.status.loading &&
                  !task.status.failed && <PauseIcon />}

                {task.status.loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: green[500],
                    }}
                  />
                )}
                {task.status.saved && <DoneAllIcon color="success" />}
                {!task.status.loading && task.status.failed && (
                  <ErrorIcon color="error" />
                )}

                <ListItemText primary={task.type} />

                {!task.status.loading && task.status.failed && (
                  <IconButton onClick={() => saveTask(task)}>
                    <ReplayIcon />
                  </IconButton>
                )}

                {!task.status.loading && (
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteTask(task.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </ListItem>
            ))}
          </List>
          <DialogActions>
            {tasks.length > 0 && !allSaved && (
              <Button onClick={onSaveClick}>
                Save All <CheckIcon />
                {savingAll && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: green[500],
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: "-12px",
                      marginLeft: "-12px",
                    }}
                  />
                )}
              </Button>
            )}
            {tasks.length > 0 && (
              <Button
                onClick={onClearAllClick}
                color={allSaved ? "warning" : "error"}
              >
                Clear all <DeleteIcon />
              </Button>
            )}
          </DialogActions>
        </DialogContent>
      </Dialog>
      <OfflineTaskContext.Provider value={{ owner }}>
        {children}
      </OfflineTaskContext.Provider>
    </>
  );
};
