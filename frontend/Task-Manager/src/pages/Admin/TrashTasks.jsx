import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import TaskCard from "../../components/Cards/TaskCard";
import { useTranslation } from "react-i18next";

const TrashTasks = () => {
  const [tasks, setTasks] = useState([]);
  const { t } = useTranslation();

  const fetchTrashTasks = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.TASKS.GET_TRASH_TASKS);

      console.log("Trash response:", res.data);

      setTasks(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching trash tasks", error);
    }
  };

  useEffect(() => {
    fetchTrashTasks();
  }, []);

  return (
    <DashboardLayout activeMenu={t("sidebar.trash")}>
      <div className="my-5">
        <h2 className="text-xl font-medium mb-4">🗑️ {t("tasks.trash")}</h2>

        {tasks.length === 0 ? (
          <p className="text-gray-500">Trash is empty</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                title={task.title}
                description={task.description}
                priority={task.priority}
                status={task.status}
                progress={task.progress}
                createdAt={task.createdAt}
                dueDate={task.dueDate}
                assignedTo={task.assignedTo?.map((u) => u.profileImageUrl)}
                completedTodoCount={task.completedTodoCount || 0}
                todoChecklist={task.todoChecklist || []}
                isTrash
                onRestore={async () => {
                  await axiosInstance.put(`/api/tasks/${task._id}/restore`);
                  fetchTrashTasks();
                }}
                onPermanentDelete={async () => {
                  await axiosInstance.delete(
                    `/api/tasks/${task._id}/permanent`
                  );
                  fetchTrashTasks();
                }}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TrashTasks;
