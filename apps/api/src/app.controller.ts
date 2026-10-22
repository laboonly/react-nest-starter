import { Body, Controller, Get, Post } from '@nestjs/common';
import { z } from 'zod';
import { AppService } from './app.service';
import { ZodValidationPipe } from './common/pipes/zod-validation.pipe';

const echoSchema = z.object({
  message: z.string().trim().min(1).max(200),
});

type EchoInput = z.infer<typeof echoSchema>;

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  health() {
    return this.appService.health();
  }

  @Post('echo')
  echo(
    @Body(new ZodValidationPipe(echoSchema))
    body: EchoInput,
  ) {
    return {
      message: body.message,
    };
  }
}
