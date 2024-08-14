import plugin from '../../../lib/plugins/plugin.js'
import Config from '../components/Config.js'

export class setting extends plugin {
  constructor() {
    super({
      name: 'VITS-设置',
      dsc: '设置',
      event: 'message',
      priority: 1009,
      rule: [
        {
          reg: '^#vits设置语音(.*)$',
          fnc: 'setVoice',
          permission: 'master'
        },
        {
          reg: '^#vits(开启|关闭)同传$',
          fnc: 'setSync',
        }
      ]
    })
  }

  async setVoice(e) {
    const voice = e.msg.replace(/^#vits设置语音/, '').trim()
    const config = await Config.getConfig()
    config.default_voice = voice
    await Config.setConfig(config)
    e.reply(`默认语音已设置为: ${voice}`)
    return true
  }

  async setSync(e) {
    if (!e.group_id) {
      e.reply('请在群聊中使用此功能')
      return true
    }
    const config = await Config.getConfig()
    const action = e.msg.includes('开启') ? '开启' : '关闭'
    const userConfig = config.tts_sync_config.find(item => item.user_id == e.user_id) || { user_id: e.user_id, enable_group: [] }

    if (action === '开启') {
      if (!userConfig.enable_group.includes(String(e.group_id))) {
        userConfig.enable_group.push(String(e.group_id))
      }
    } else {
      userConfig.enable_group = userConfig.enable_group.filter(id => id !== String(e.group_id))
    }

    const index = config.tts_sync_config.findIndex(item => item.user_id == e.user_id)
    if (index > -1) {
      config.tts_sync_config[index] = userConfig
    } else {
      config.tts_sync_config.push(userConfig)
    }

    await Config.setConfig(config)
    e.reply(`当前群聊同传已${action}`)
    return true
  }
}
