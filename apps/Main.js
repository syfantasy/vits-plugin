export class vits_sync extends plugin {
  constructor() {
    super({
      name: 'VITS-同传',
      dsc: '同音传声',
      event: 'message',
      priority: 99999,
      rule: [
        {
          reg: '',
          fnc: 'sync',
          log: false
        }
      ]
    })
  }

  async sync(e) {
    try {
      if (!e.group_id || !e.user_id) return false;

      const { tts_sync_config: config } = await Config.getConfig();
      const c = config.find(item => item.user_id == e.user_id);
      if (!c) return false;

      if (!c.enable_group.includes(String(e.group_id))) return false;

      // 在这里可以添加你的自定义逻辑，比如记录日志或进行其他处理
      logger.info(`用户 ${e.user_id} 在群 ${e.group_id} 发送了消息：${e.msg}`);

      return false;
    } catch (err) {
      logger.error(err)
      return false;
    }
  }
}
