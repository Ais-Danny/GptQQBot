# GptQQBot

## 说明
- QQ(安卓)协议基于Node.js的实现，支持最低node版本为 v14
- 目前仅支持ChatGPT API模式(gpt-3.5-turbo)
- 需自备key(openai官网申请)
<br>
<br>
## 快速启动

1. 前往 [releases](https://github.com/Ais-Danny/GptQQBot/releases/tag/V1.0.0) 下载对应平台的可执行文件。
2. 运行可执行文件。
3. 聊天时，私聊会直接回答，群聊需要at机器人。
4. 命令系统：内置的命令系统可以更改设置。具体命令帮助可以在聊天中发送 `/help` 获得解释

## 使用方法


1. nodejs环境运行(无nodejs环境无法运行)下载Releases中app.js 直接运行
    ```cmd
    node app.js
    ```
2. 从源码运行
    
    #### git仓库到本地
    ```cmd
    git clone https://github.com/Ais-Danny/GptQQBot.git
    ```
    #### 下载依赖
    ```cmd
    npm i 
    ```
    #### 启动程序
    ```cmd
    npm run dev 
    ```

## 配置文件

1. **config.json**
   proxy 为代理的配置，部分地区访问不了openai的话需要配置该项

   ```json
   {
       
     "proxy": {
       "enable": true,
       "host": "127.0.0.1",
       "port": 7890
     },
     "officialAPI": {
       "enable": true,
       "enableChatGPT": true,
       "model": "gpt-3.5-turbo",
     }
   }
   ```

命令系统：内置的命令系统可以更改设置。具体命令帮助可以在聊天中发送 `/help` 获得解释。<br>

<br>

**密码登录可能会显示风控，可尝试更换协议登录，扫码登录全平台正常使用（扫码需要在同一局域网下）。**
 - 增加了日志获取命令。

-  增加文件get到qq功能（大文件传输有bug，小文件日志什么的没问题）。

 - 增加了发送消息linux命令执行。
 
 
 

## 交流群

![YQ`@SO_A@57DC@T$PU95MSO](./img/gurp.png)
 
## 感谢

- https://github.com/takayama-lily/oicq
- https://github.com/transitive-bullshit/chatgpt-api
- https://github.com/easydu2002/chat_gpt_oicq
