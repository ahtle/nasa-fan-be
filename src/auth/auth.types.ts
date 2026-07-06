import { User } from "@prisma/client";

export type UserResponse = Pick<User, "id" | "email" | "createdAt" | "updatedAt">;

export function toUserResponse(user: User): UserResponse {
  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export interface AuthResponse {
  accessToken: string;
  user: UserResponse;
}
