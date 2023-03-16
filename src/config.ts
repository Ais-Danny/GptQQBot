
export const config = {

  adminQQ: 0,
  botQQ: 0,
  botPassword: '',
  oicq: {
    platform: 1
  },

  // proxy
  proxy: {
    enable: false,
    host: '',
    port: ''
  },

  // handler config...
  officialAPI: {

    enable: true,
    enableChatGPT: true,
    key: '',
    model: 'gpt-3.5-turbo',
    identity: [],
    maxTokens: 1024,
    maxTrackCount: 1,
    temperature: 0.9,
    stop: ['Human', 'AI'],
    name: ['Human', 'AI']
  },
  api: {

    enable: false,
    email: '',
    password: '',
    browserPath: ''
  }
}
