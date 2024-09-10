import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { UnhandledExceptionBus, UnhandledExceptionInfo } from '@nestjs/cqrs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export class ExceptionLoggerService implements OnModuleDestroy {
  private readonly logger = new Logger(ExceptionLoggerService.name);
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly unhandledExceptionsBus: UnhandledExceptionBus) {
    this.unhandledExceptionsBus.pipe(takeUntil(this.destroy$)).subscribe((exceptionInfo: UnhandledExceptionInfo) => {
      this.handleException(exceptionInfo);
    });
  }

  handleException(exceptionInfo: UnhandledExceptionInfo) {
    const { exception, cause } = exceptionInfo;
    this.logger.error(
      `Unhandled exception occurred: ${exception.message}`,
      exception.stack,
      `Cause: ${JSON.stringify(cause)}`,
    );
  }

  onModuleDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
