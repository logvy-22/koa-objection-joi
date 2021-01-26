import { Model } from 'objection';

class ChatRoom extends Model {
  id!: number;

  name!: string;

  is_private!: boolean;

  static tableName = 'rooms';
}

export default ChatRoom;
