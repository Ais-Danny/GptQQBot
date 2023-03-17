import { Sender } from '../../model/sender'
import { BaseCommand } from '../command'
import { exec } from 'child_process';
import logger from 'src/util/log';

/**
 * 执行Linux命令
 * @param cmd Linux命令字符串
 * @param timeout 超时时间，单位为毫秒
 * @returns Promise对象，resolve时返回命令的标准输出字符串，reject时返回错误信息
 */
function runCommand(cmd: string, timeout: number = 5000): Promise<string> {
    return new Promise((resolve, reject) => {
        // 执行命令
        const options = {
            cwd: '/home'
        }
        const process = exec(cmd, options, (error, stdout, stderr) => {
            if (error) {
                reject(error.message);
            } else if (stderr) {
                reject(stderr);
            } else {
                resolve(stdout);
            }
        });
        // 设置超时
        const timer = setTimeout(() => {
            process.kill(); // 中断进程
            reject(`Command ${cmd} timed out after ${timeout} ms`);
        }, timeout);

        process.on('exit', () => {
            clearTimeout(timer); // 清除超时计时器
        });
    });
}

class CmdCommand extends BaseCommand {
    label = 'cmd'
    usage = [
        ' //直接输入控制台命令',
        'get //获取服务器文件发送至qq'

    ]

    requiredAdministrator = true
    description = '控制台命令操作'

    execute(sender: Sender, params: string[]) {
        switch (params[0]) {
            case 'get':
                sender.sendFile(params[1]);
                break;
            default:
                runCommand(params.join(' ')).then(result => {
                    //console.log(result);
                    sender.reply(result, true);
                }).catch(error => {
                    console.error(error);
                    sender.reply(error, true);
                    logger.error(error);
                });
                //sender.reply(this.helpDoc, true)
                break
        }
    }
}

export default CmdCommand
