import { SetMetadata } from "@nestjs/common";
import { Role } from "src/types/user";

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);