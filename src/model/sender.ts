import { config } from 'src/config'
import { MessageEvent } from 'src/types'
import { GuildMessage } from 'oicq-guild/lib/message'
import { DiscussMessage, Friend, Gfs, GroupMessage, PrivateMessage, Sendable } from 'oicq'
import logger from 'src/util/log'
/**
 * 消息对象的封装
 */
export class Sender {
  isAdmin: boolean

  /**
   * 文本信息（不含@）
   */
  textMessage: string

  _eventObject: MessageEvent

  userID: number

  friend: Friend

  gfs: Gfs
  constructor(e: MessageEvent) {
    this._eventObject = e

    this.textMessage = e.message.filter(item => item.type === 'text').map(item => item.text).join().trim()
    if (!(e instanceof GuildMessage)) {
      this.userID = e.sender.user_id
      this.isAdmin = e.sender.user_id === Number(config.adminQQ)
      if (e instanceof PrivateMessage) {
        this.friend = e.friend
      } else if (e instanceof (GroupMessage || DiscussMessage)) {
        this.gfs = e.group.fs
      }
    }
  }

  reply(content: Sendable, quote?: boolean) {
    this._eventObject.reply(content, quote)
  }

  sendLogs() {//获取日志
    if (this.gfs != undefined) {
      this.gfs.upload('log/notice.log')
    } else {
      this.friend.sendFile('log/notice.log', 'logs.txt', undefined);
    }
  }

  sendFile( uri: string) {//获取文件
    try {
      if (this.gfs != undefined) {
        const ss=this.gfs.upload(uri)
      } else {
        this.friend.sendFile(uri);
      }
    } catch {
      this._eventObject.reply('文件上传失败...', true);
      logger.error("文件上传失败...");
    }
  }
}
