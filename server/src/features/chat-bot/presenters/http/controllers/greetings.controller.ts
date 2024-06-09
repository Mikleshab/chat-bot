import { Controller, Get, Query } from '@nestjs/common';
import { ChatBotService } from '../../../application/chat-bot.service';
import { WelcomeCommand } from '../../../application/commands';

@Controller('welcome')
export class GreetingsController {
  constructor(private readonly chatBotService: ChatBotService) {}

  @Get()
  async welcome(@Query('name') name?: string): Promise<string> {
    return this.chatBotService.welcome(new WelcomeCommand(name || ''));
  }
}
