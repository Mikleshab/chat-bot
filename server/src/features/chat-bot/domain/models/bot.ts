import { Injectable } from '@nestjs/common';
import { BotRepository } from '../../application/repositories/bot.repository';
import { Chat } from '../models/chat';
import { Member } from '../models/member';
import { Announcement } from '@features/chat-announcements/domain/model/announcement';

@Injectable()
export class Bot {
  constructor(private readonly botRepository: BotRepository) {}

  start() {
    this.botRepository.handleJoin((chat: Chat, member: Member) => member.join(chat));
    this.botRepository.handleLeft((chat: Chat, member: Member) => member.left(chat));
  }

  send(chatId: Chat['id'], announcement: Announcement) {
    this.botRepository.send(chatId, announcement);
  }
}
