// guoba.support.js

import Config from "./components/Config.js";

export function supportGuoba() {
  return {
    pluginInfo: {
      name: 'vits-plugin',
      title: 'VITS插件',
      author: '@Your_Name',
      authorLink: 'https://github.com/Your_Name',
      link: 'https://github.com/Your_Name/vits-plugin',
      isV3: true,
      isV2: false,
      description: '基于海螺API的语音同传插件',
      icon: 'mdi:text-to-speech',
      iconColor: '#7CFC00'
    },
    configInfo: {
      schemas: [
        {
          field: 'api_key',
          label: 'API Key',
          bottomHelpMessage: '海螺API的密钥',
          component: 'Input',
          required: true,
          componentProps: {
            placeholder: '请输入API Key'
          }
        },
        {
          field: 'api_url',
          label: 'API URL',
          bottomHelpMessage: '海螺API的URL',
          component: 'Input',
          required: true,
          componentProps: {
            placeholder: 'https://hailuo-free-api-0rpw.onrender.com/v1/audio/speech'
          }
        },
        {
          field: 'default_voice',
          label: '默认发音人',
          bottomHelpMessage: '默认使用的发音人',
          component: 'Select',
          componentProps: {
            options: [
  { value: 'male-botong', name: '思远', compatibility: 'tts-1 alloy' },
  { value: 'Podcast_girl', name: '心悦', compatibility: 'tts-1 echo' },
  { value: 'boyan_new_hailuo', name: '子轩', compatibility: 'tts-1 fable' },
  { value: 'female-shaonv', name: '灵儿', compatibility: 'tts-1 onyx' },
  { value: 'YaeMiko_hailuo', name: '语嫣', compatibility: 'tts-1 nova' },
  { value: 'xiaoyi_mix_hailuo', name: '少泽', compatibility: 'tts-1 shimmer' },
  { value: 'xiaomo_sft', name: '芷溪', compatibility: 'tts-1-hd alloy' },
  { value: 'cove_test2_hailuo', name: '浩翔', language: '英文' },
  { value: 'scarlett_hailuo', name: '雅涵', language: '英文' },
  { value: 'Leishen2_hailuo', name: '雷电将军', compatibility: 'tts-1-hd echo' },
  { value: 'Zhongli_hailuo', name: '钟离', compatibility: 'tts-1-hd fable' },
  { value: 'Paimeng_hailuo', name: '派蒙', compatibility: 'tts-1-hd onyx' },
  { value: 'keli_hailuo', name: '可莉', compatibility: 'tts-1-hd nova' },
  { value: 'Hutao_hailuo', name: '胡桃', compatibility: 'tts-1-hd shimmer' },
  { value: 'Xionger_hailuo', name: '熊二' },
  { value: 'Haimian_hailuo', name: '海绵宝宝' },
  { value: 'Robot_hunter_hailuo', name: '变形金刚' },
  { value: 'Linzhiling_hailuo', name: '小玲玲' },
  { value: 'huafei_hailuo', name: '拽妃' },
  { value: 'lingfeng_hailuo', name: '东北er' },
  { value: 'male_dongbei_hailuo', name: '老铁' },
  { value: 'Beijing_hailuo', name: '北京er' },
  { value: 'JayChou_hailuo', name: 'JayJay' },
  { value: 'Daniel_hailuo', name: '潇然' },
  { value: 'Bingjiao_zongcai_hailuo', name: '沉韵' },
  { value: 'female-yaoyao-hd', name: '瑶瑶' },
  { value: 'murong_sft', name: '晨曦' },
  { value: 'shangshen_sft', name: '沐珊' },
  { value: 'kongchen_sft', name: '祁辰' },
  { value: 'shenteng2_hailuo', name: '夏洛特' },
  { value: 'Guodegang_hailuo', name: '郭嘚嘚' },
  { value: 'yueyue_hailuo', name: '小月月' }
            ]
          }
        },
        {
          field: 'tts_sync_config',
          label: '同传配置',
          bottomHelpMessage: '用户同传配置',
          component: 'GTags',
        }
      ],
      getConfigData() {
        return Config.getConfig();
      },
      setConfigData(data, { Result }) {
        Config.setConfig(data);
        return Result.ok({}, '保存成功');
      }
    }
  };
}
