import { initOicq } from 'src/core/oicq'
import { BaseMessageHandler } from 'src/types'
import { Sender } from '../../model/sender'
import { BaseCommand } from '../command'
import messageHandlers from './../../handler'
import os from 'os';

class ServerCommand extends BaseCommand {
  label = 'server'
  usage = [
    'reboot // 重启机器人',
    'status // 服务器状态',
    'logs //系统日志'
  ]

  requiredAdministrator = true
  description = '服务操作相关命令'

  async execute (sender: Sender, params: string[]) {
    switch (params[0]) {
      case 'reboot':
        sender.reply('重启中, 稍等~')
        await Promise.all(
          messageHandlers.map(async item => {
            if (item instanceof BaseMessageHandler) {
              await item.reboot()
            }
          })
        )
        await initOicq()
        break
      case 'status':
        sender.reply("Memory Usage:"+((await getMemUsage())/100).toFixed(2)+"%", true)
        break
      case 'logs':
        
        sender.sendLogs()
        break
      default:
        sender.reply(this.helpDoc, true)
        break
    }
  }
}


async function getMemUsage() {
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  return Math.floor(((totalMem - freeMem) / totalMem) * 10000);
}

export default ServerCommand
