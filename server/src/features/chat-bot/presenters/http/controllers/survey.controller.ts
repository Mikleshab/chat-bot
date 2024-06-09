import { Controller, Get, Query } from '@nestjs/common';
import { ChatBotService } from '../../../application/chat-bot.service';
import { SurveyCommand } from '../../../application/commands';

@Controller('survey')
export class SurveyController {
  constructor(private readonly chatBotService: ChatBotService) {}

  @Get()
  async survey(@Query('clientId') clientId: string): Promise<string> {
    const response = await this.chatBotService.survey(new SurveyCommand(clientId));
    return response.getMessage();
  }
}
