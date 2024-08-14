import fs from 'fs'
import yaml from 'yaml'
import { pluginRoot } from './path.js'

class Init {
  constructor() {
    this.initConfig()
  }

  initConfig() {
    const configPath = `${pluginRoot}/config/config_default.yaml`
    try {
      if (fs.existsSync(configPath)) {
        const file = fs.readFileSync(configPath, 'utf8')
        const config = yaml.parse(file)
        // 进行必要的配置处理
      } else {
        console.error('配置文件不存在：', configPath)
      }
    } catch (error) {
      console.error('读取配置文件时出错：', error)
    }
  }
}

export default new Init()
