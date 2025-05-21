//@ts-ignore
import { render, unmountComponentAtNode } from 'react-dom';
import React, { CSSProperties, useEffect } from 'react';
import { IMessageProps, Message } from './Message';
import { noop } from '../../../../TUICallService/utils/common-utils';

let keyIndex = 0;
const messageList = [];

function MessageContainer(props) {
  const {
    children, zIndex, id, renderCallback,
  } = props;

  const style: CSSProperties = {
    zIndex,
    top: '32px',
    width: '100%',
    position: 'absolute',
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  useEffect(() => {
    renderCallback?.();
    // eslint-disable-next-line
  }, []);

  return (
    <div style={style} id={id}>
      {children}
    </div>
  );
}

function createContainer(): Promise<Element> {
  return new Promise((resolve) => {
    // The default injection is into the body.
    // If the user has specified a value, it will be used instead.
    const mountedDom = document.body;

    // The selector finds a container for mounting the message.
    // If it does not exist, it will be created.
    const containerId = 'tdesign-message-container--top';
    const container = Array.from(mountedDom.querySelectorAll(`#${containerId}`));
    if (container.length < 1) {
      const div = document.createElement('div');
      render(
        <MessageContainer
          id={containerId}
          zIndex={1}
          renderCallback={() => {
            mountedDom.appendChild(div);
            const containers = Array.from(mountedDom.querySelectorAll(`#${containerId}`));
            resolve(containers[0]);
          }}
        />,
        div,
      );
    } else {
      resolve(container[0]);
    }
  });
}

async function createMessage(theme, config): Promise<any> {
  const container = (await createContainer()) as HTMLElement;

  const { content, offset, onClose = noop } = config;
  const div = document.createElement('div');
  // div.className = 'message-list-container';

  keyIndex += 1;

  const message = {
    close: () => {
      unmountComponentAtNode(div);
      div.remove();
      message.closed = true;
    },
    key: keyIndex,
    closed: false,
  };

  let style: React.CSSProperties = { ...config.style };
  if (Array.isArray(offset) && offset.length === 2) {
    const [left, top] = offset;
    style = {
      left,
      top,
      ...style,
      position: 'relative',
    };
  }

  return new Promise((resolve) => {
    // TODO
    // ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot
    // Renders the component.
    render(
      <Message
        key={keyIndex}
        {...config}
        theme={theme}
        style={style}
        onClose={(ctx) => {
          onClose(ctx);
          message.close();
        }}
      >
        {content}
      </Message>,
      div,
    );

    // Mounts the current rendered message to the specified container.
    container.appendChild(div);
    // Adds the message to the message list.
    messageList.push(message);
    // Returns the message instance to the promise caller through the resolve function.
    resolve(message);
  });
}

function info(props: IMessageProps) {
  createMessage('info', props);
}
function warn(props: IMessageProps) {
  createMessage('warn', props);
}
function success(props: IMessageProps) {
  createMessage('success', props);
}
function error(props: IMessageProps) {
  createMessage('error', props);
}
function closeAll() {
  messageList?.forEach((message) => message.close());
}

export const MessagePlugin = {
  info,
  warn,
  success,
  error,
  closeAll,
};
