import { Chat } from '@features/chat-bot/domain/models/chat';
import { Member } from '@features/chat-bot/domain/models/member';
import { LoggerRepository } from '@features/logger/application/repositories/logger.repository';
import { MemberLog } from '@features/logger/domain/value-objects/member-log';
import { MessageLog } from '@features/logger/domain/value-objects/message-log';
import { MemberMapper } from '@features/logger/infrastructure/firebase/mappers/member.mapper';
import { MessageMapper } from '@features/logger/infrastructure/firebase/mappers/message.mapper';
import { FirebaseService } from '@libs/firebase/services/firebase.service';
import * as admin from 'firebase-admin';
import {
  CHAT_MEMBERS_COLLECTION,
  CHAT_MESSAGES_COLLECTION,
  CHATS_COLLECTION,
  COUNTERS_COLLECTION,
} from 'src/common/constants/collections';

export class FirebaseLoggerRepository implements LoggerRepository {
  constructor(private readonly firebase: FirebaseService) {}

  async saveMember(memberLog: MemberLog): Promise<void> {
    const db = this.firebase.app.firestore();
    const countersDocRef = db.collection(COUNTERS_COLLECTION).doc(memberLog.chatId.toString());
    const memberDocRef = db
      .collection(CHATS_COLLECTION)
      .doc(memberLog.chatId.toString())
      .collection(CHAT_MEMBERS_COLLECTION)
      .doc(memberLog.id.toString());

    await db.runTransaction(async (transaction) => {
      transaction.set(memberDocRef, MemberMapper.toDoc(memberLog));

      transaction.update(countersDocRef, {
        [`${CHAT_MEMBERS_COLLECTION}.count`]: admin.firestore.FieldValue.increment(1),
      });
    });
  }

  async deleteMember(chatId: Chat['id'], memberId: Member['id']): Promise<void> {
    const db = this.firebase.app.firestore();
    const countersDocRef = db.collection(COUNTERS_COLLECTION).doc(chatId.toString());
    const memberDocRef = db
      .collection(CHATS_COLLECTION)
      .doc(chatId.toString())
      .collection(CHAT_MEMBERS_COLLECTION)
      .doc(memberId.toString());

    await db.runTransaction(async (transaction) => {
      transaction.delete(memberDocRef);

      transaction.update(countersDocRef, {
        [`${CHAT_MEMBERS_COLLECTION}.count`]: admin.firestore.FieldValue.increment(-1),
      });
    });
  }

  async saveMessage(messageLog: MessageLog): Promise<void> {
    const db = this.firebase.app.firestore();
    const countersDocRef = db.collection(COUNTERS_COLLECTION).doc(messageLog.chatId.toString());
    const messageDocRef = db
      .collection(CHATS_COLLECTION)
      .doc(messageLog.chatId.toString())
      .collection(CHAT_MESSAGES_COLLECTION)
      .doc(messageLog.id.toString());

    await db.runTransaction(async (transaction) => {
      transaction.set(messageDocRef, MessageMapper.toDoc(messageLog));

      transaction.update(countersDocRef, {
        [`${CHAT_MESSAGES_COLLECTION}.count`]: admin.firestore.FieldValue.increment(1),
      });
    });
  }
}
