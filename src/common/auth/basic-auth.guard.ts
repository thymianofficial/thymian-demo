import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from '../../modules/users/users.service';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request & { user?: any } = context.switchToHttp().getRequest();
    const header = request.headers['authorization'];
    if (!header || !header.startsWith('Basic ')) {
      throw new UnauthorizedException('Missing Basic Authorization header');
    }
    const base64 = header.split(' ')[1];
    let credentials: string;
    try {
      credentials = Buffer.from(base64, 'base64').toString('utf8');
    } catch (e) {
      throw new UnauthorizedException('Invalid Authorization header');
    }
    const sep = credentials.indexOf(':');
    if (sep === -1) {
      throw new UnauthorizedException('Invalid Authorization header');
    }
    const username = credentials.slice(0, sep);
    const password = credentials.slice(sep + 1);
    const user = await this.usersService.validate(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // attach to request for controllers
    (request as any).user = user;
    return true;
  }
}
