import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { HandleUpdateCommand } from '@features/chat-bot/application/commands/handle-update.command';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Telegram Webhook')
@Controller('webhook')
export class WebhookController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Telegram update successfully processed' })
  @ApiInternalServerErrorResponse({ description: 'Telegram update handling error' })
  async handleUpdate(@Body() update: unknown): Promise<void> {
    try {
      await this.commandBus.execute(new HandleUpdateCommand(update));
    } catch (error) {
      throw {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Telegram update handle error',
      };
    }
  }
}
