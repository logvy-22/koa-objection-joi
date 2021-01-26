import { Model } from 'objection';

import ChatRoom from './ChatRoom';

class ChatMessage extends Model {
  id!: number;

  user_id!: number;

  room_id!: boolean;

  message!: string;

  static tableName = 'messages';

  static relationMappings = {
    room: {
      relation: Model.BelongsToOneRelation,
      modelClass: ChatRoom,
      join: {
        from: 'messages.room_id',
        to: 'rooms.id',
      },
    },
  };
}
export default ChatMessage;
