import { message } from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';

let messageApi: MessageInstance;

export const initMessage = () => {
  const [api, contextHolder] = message.useMessage();
  messageApi = api;
  return contextHolder;
};

type MessageType = 'success' | 'error' | 'warning' | 'info';

/**
 * 全局消息提示函数
 * @param type 消息类型
 * @param content 消息内容
 */
export const showMessage = (type: MessageType, content: string) => {
  if (!messageApi) {
    console.error('Message API not initialized. Please call initMessage() first.');
    return;
  }
  messageApi.open({
    type,
    content,
    duration: 3,
    style: { color: "black" }
  });
};

/**
 * 成功消息提示
 * @param content 消息内容
 */
export const showSuccess = (content: string) => {
  showMessage('success', content);
};

/**
 * 错误消息提示
 * @param content 消息内容
 */
export const showError = (content: string) => {
  showMessage('error', content);
};

/**
 * 警告消息提示
 * @param content 消息内容
 */
export const showWarning = (content: string) => {
  showMessage('warning', content);
};

/**
 * 信息消息提示
 * @param content 消息内容
 */
export const showInfo = (content: string) => {
  showMessage('info', content);
};