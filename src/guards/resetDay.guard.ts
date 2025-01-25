import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class DateRestrictedGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const currentDate = new Date();

    const resetDay = ['2025-05-26'];

    const formattedDate = currentDate.toISOString().split('T')[0];

    if (resetDay.includes(formattedDate)) {
      throw new ForbiddenException('sorry today is off day.');
    }

    return true;
  }
}
