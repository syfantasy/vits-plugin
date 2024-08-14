import plugin from '../../../lib/plugins/plugin.js'
import Config from '../components/Config.js'
import fetch from 'node-fetch'
import fs from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'
import path from 'path'

const streamPipeline = promisify(pipeline)

export class TTS extends plugin {
  constructor() {
    super({
      name: 'VITS-文本转语音',
      dsc: '文本转语音',
      event: 'message',
      priority: 1,
      rule: [
        {
          reg: '^[/#]?合成.*语音.*$',
          fnc: 'tts'
        }
      ]
    })
  }

  async tts(e) {
    const [_, role, text] = e.msg.match(/^[/#]?合成(.*?)语音(.*?)$/) || [];
    if (!role || !text) return e.reply(`请输入要使用的${role ? '文本' : '角色'}`);

    const config = await Config.getConfig();
    if (config.tts_config.send_reminder) await e.reply('正在合成语音，请稍等...', true);

    try {
      const response = await fetch(config.api_url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${config.api_key}`,
          'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'hailuo',
          input: text,
          voice: role
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const audioFilePath = path.join(process.cwd(), `temp_${Date.now()}.mp3`);
      await streamPipeline(response.body, fs.createWriteStream(audioFilePath));

      if (config.tts_config.send_base64) {
        const audioData = fs.readFileSync(audioFilePath);
        const base64Audio = audioData.toString('base64');
        await e.reply(segment.record(`base64://${base64Audio}`));
      } else {
        await e.reply(segment.record(audioFilePath));
      }

      // 删除临时文件
      fs.unlinkSync(audioFilePath);

    } catch (error) {
      console.error('TTS 请求失败:', error);
      return e.reply('语音合成失败，请检查配置或稍后再试。');
    }

    return true;
  }
}
