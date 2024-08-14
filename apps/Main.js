import plugin from '../../../lib/plugins/plugin.js'
import fetch from 'node-fetch'
import fs from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'
import path from 'path'
import Config from '../components/Config.js'

const streamPipeline = promisify(pipeline)

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

      const config = await Config.getConfig();
      const userConfig = config.tts_sync_config.find(item => item.user_id == e.user_id);
      if (!userConfig) return false;

      if (!userConfig.enable_group.includes(String(e.group_id))) return false;

      const text = e.msg;
      const voice = userConfig.voice || config.default_voice;
      const apiKey = config.api_key;
      const apiUrl = config.api_url;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'hailuo',
          input: text,
          voice: voice
        })
      });

      if (!response.ok) {
        console.error('TTS 请求失败:', response.status, response.statusText);
        return false;
      }

      const audioFilePath = path.join(process.cwd(), `temp_${Date.now()}.mp3`);
      await streamPipeline(response.body, fs.createWriteStream(audioFilePath));

      await e.reply(segment.record(audioFilePath));

      fs.unlinkSync(audioFilePath);

      return false;
    } catch (err) {
      logger.error(err);
      return false;
    }
  }
}
