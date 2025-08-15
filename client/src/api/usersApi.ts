import api from "../lib/axios";

export interface UserDTO {
  id: string;
  full_name: string;
  email: string;
  role: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateUserDTO {
  full_name: string;
  email: string;
  password: string;
}

export interface UpdateUserDTO {
  full_name?: string;
  email?: string;
  password?: string;
  role?: string;
}

export async function createUser(data: CreateUserDTO): Promise<UserDTO> {
  const res = await api.post<UserDTO>("/users", data);
  return res.data;
}

export async function getUsers(): Promise<UserDTO[]> {
  const res = await api.get<UserDTO[]>("/users");
  return res.data;
}

export async function getUser(id: string): Promise<UserDTO> {
  const res = await api.get<UserDTO>(`/users/${id}`);
  return res.data;
}

export async function updateUser(
  id: string,
  data: UpdateUserDTO
): Promise<UserDTO> {
  const res = await api.patch<UserDTO>(`/users/${id}`, data);
  return res.data;
}

export async function deleteUser(
  id: string
): Promise<{ success: true } | void> {
  const res = await api.delete(`/users/${id}`);
  return res.data ?? ({ success: true } as const);
}
