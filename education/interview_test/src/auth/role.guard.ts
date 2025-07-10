import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "src/users/schemas/user.schema";

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector){}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler()) || [];
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.length ? requiredRoles.includes(user.role) : true;
  }
}