import YAML from 'yaml'
import fs from 'fs'
import { pluginRoot } from '../model/path.js'

class Config {
  getConfig() {
    const configPath = `${pluginRoot}/config/config/config.yaml`
    try {
      const config = YAML.parse(fs.readFileSync(configPath, 'utf8'))
      return config
    } catch (error) {
      console.error('读取配置文件失败:', error)
      return {}
    }
  }

  setConfig(config) {
    const configPath = `${pluginRoot}/config/config/config.yaml`
    try {
      const yamlStr = YAML.stringify(config)
      fs.writeFileSync(configPath, yamlStr, 'utf8')
    } catch (error) {
      console.error('写入配置文件失败:', error)
    }
  }
}

export default new Config()
