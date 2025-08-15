import api from "../lib/axios";

export interface TaskDTO {
  id: string;
  title: string;
  details?: string | null;
}

export interface CreateTaskDTO {
  title: string;
  details?: string;
}

export interface UpdateTaskDTO {
  title?: string;
  details?: string | null;
}

export async function createTask(data: CreateTaskDTO): Promise<TaskDTO> {
  const res = await api.post<TaskDTO>("/tasks", data);
  return res.data;
}

export async function getTasks(): Promise<TaskDTO[]> {
  const res = await api.get<TaskDTO[]>("/tasks");
  return res.data;
}

export async function getTask(id: string): Promise<TaskDTO> {
  const res = await api.get<TaskDTO>(`/tasks/${id}`);
  return res.data;
}

export async function updateTask(
  id: string,
  data: UpdateTaskDTO
): Promise<TaskDTO> {
  const res = await api.patch<TaskDTO>(`/tasks/${id}`, data);
  return res.data;
}

export async function deleteTask(
  id: string
): Promise<{ success: true } | void> {
  const res = await api.delete(`/tasks/${id}`);
  return res.data ?? ({ success: true } as const);
}
