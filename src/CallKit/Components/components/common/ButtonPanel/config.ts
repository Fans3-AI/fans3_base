import Accept from './button/Accept';
import Reject from './button/Reject';
import Microphone from './button/Microphone';
import Camera from './button/Camera';
import Hangup from './button/Hangup';
import Speaker from './button/Speaker';
import SwitchCamera from './button/SwitchCamera';
import BackgroundBlur from './button/BackgroundBlur';
import MuteRemoteAudio from './button/MuteRemoteAudio';

const ButtonPanelPCConfig = {
  singleCall: {
    video: {
      calling: [
        [
          {
            component: Camera,
            name: 'camera',
            props: {},
          },
          {
            component: Microphone,
            name: 'microphone',
            props: {},
          },
          {
            component: Hangup,
          },
        ],
      ],
      accept: [
        [
          {
            component: Camera,
            name: 'camera',
            props: {},
          },
          {
            component: Reject,
            name: '',
          },
          {
            component: Accept,
            name: '',
          },
        ],
      ],
      connected: [
        [
          {
            component: MuteRemoteAudio,
            name: 'remoteAudio',
          },
          {
            component: Camera,
            name: 'camera',
            props: {},
          },
          {
            component: Microphone,
            name: 'microphone',
            props: {},
          },
          {
            component: Speaker,
            name: 'speaker',
            props: {},
          },
          {
            component: Hangup,
            name: '',
          },
        ],
      ],
    },
    audio: {
      calling: [
        [
          {
            component: Microphone,
            name: 'microphone',
            props: {},
          },
          {
            component: Hangup,
            name: '',
          },
        ],
      ],
      accept: [
        [
          {
            component: Reject,
            name: '',
          },
          {
            component: Accept,
            name: '',
          },
        ],
      ],
      connected: [
        [
          {
            component: Microphone,
            name: 'microphone',
            props: {},
          },
          {
            component: Speaker,
            name: 'speaker',
            props: {},
          },
          {
            component: Hangup,
            name: '',
          },
        ],
      ],
    },
  },
  groupCall: {
    video: {
      calling: [
        [
          {
            component: Camera,
            name: 'camera',
            props: {},
          },
          {
            component: Microphone,
            name: 'microphone',
            props: {},
          },
          {
            component: Hangup,
            name: '',
          },
        ],
      ],
      accept: [
        [
          {
            component: Reject,
            name: '',
          },
          {
            component: Accept,
            name: '',
          },
        ],
      ],
      connected: [
        [
          {
            component: Camera,
            name: 'camera',
            props: {},
          },
          {
            component: Microphone,
            name: 'microphone',
            props: {},
          },
          {
            component: Hangup,
            name: '',
          },
        ],
      ],
    },
    audio: {
      calling: [
        [
          {
            component: Microphone,
            name: 'microphone',
            props: {},
          },
          {
            component: Hangup,
            name: '',
          },
        ],
      ],
      accept: [
        [
          {
            component: Reject,
            name: '',
          },
          {
            component: Accept,
            name: '',
          },
        ],
      ],
      connected: [
        [
          {
            component: Microphone,
            name: 'microphone',
            props: {},
          },
          {
            component: Hangup,
            name: '',
          },
        ],
      ],
    },
  },
};

const ButtonPanelH5Config = {
  singleCall: {
    video: {
      calling: [
        [
          {
            component: Hangup,
            props: {
              showText: false,
            },
          },
        ],
      ],
      accept: [
        [
          {
            component: Reject,
            name: '',
            props: {
              showText: false,
            },
          },
          {
            component: Accept,
            name: '',
            props: {
              showText: false,
            },
          },
        ],
      ],
      connected: [
        [
          {
            component: Microphone,
            name: 'microphone',
            props: {},
          },
          {
            component: Speaker,
            name: 'speaker',
            props: {},
          },
          {
            component: Camera,
            name: 'camera',
            props: {},
          },
        ],
        [
          {
            component: BackgroundBlur,
            name: 'backgroundBlur',
            props: {
              style: {
                justifyContent: 'center',
                alignItems: 'center',
                visibility: 'hidden',
              },
            },
          },
          {
            component: Hangup,
            name: '',
            props: {
              showText: false,
            },
          },
          {
            component: SwitchCamera,
            name: 'switchCamera',
            props: {
              style: {
                justifyContent: 'center',
                alignItems: 'center',
              },
            },
          },
        ],
      ],
    },
    audio: {
      calling: [
        [
          {
            component: Hangup,
            name: '',
            props: {
              showText: false,
            },
          },
        ],
      ],
      accept: [
        [
          {
            component: Reject,
            name: '',
          },
          {
            component: Accept,
            name: '',
          },
        ],
      ],
      connected: [
        [
          {
            component: Microphone,
            name: 'microphone',
            props: {},
          },
          {
            component: Hangup,
            name: '',
          },
          {
            component: Speaker,
            name: 'speaker',
            props: {},
          },
        ],
      ],
    },
  },
  groupCall: {
    video: {
      calling: [
        [
          {
            component: Microphone,
            name: 'microphone',
            props: {},
          },
          {
            component: Speaker,
            name: 'speaker',
            props: {},
          },
          {
            component: Camera,
            name: 'camera',
            props: {},
          },
        ],
        [
          {
            component: Hangup,
            name: '',
            props: {
              showText: false,
            },
          },
        ],
      ],
      accept: [
        [
          {
            component: Reject,
            name: '',
            props: {
              showText: false,
            },
          },
          {
            component: Accept,
            name: '',
            props: {
              showText: false,
            },
          },
        ],
      ],
      connected: [
        [
          {
            component: Microphone,
            name: 'microphone',
            props: {},
          },
          {
            component: Speaker,
            name: 'speaker',
            props: {},
          },
          {
            component: Camera,
            name: 'camera',
            props: {},
          },
        ],
        [
          {
            component: Hangup,
            name: '',
            props: {
              showText: false,
            },
          },
        ],
      ],
    },
    audio: {
      calling: [
        [
          {
            component: Microphone,
            name: 'microphone',
            props: {},
          },
          {
            component: Speaker,
            name: 'speaker',
            props: {},
          },
          {
            component: Camera,
            name: 'camera',
            props: {},
          },
        ],
        [
          {
            component: Hangup,
            name: '',
            props: {
              showText: false,
            },
          },
        ],
      ],
      accept: [
        [
          {
            component: Reject,
            name: '',
            props: {
              showText: false,
            },
          },
          {
            component: Accept,
            name: '',
            props: {
              showText: false,
            },
          },
        ],
      ],
      connected: [
        [
          {
            component: Microphone,
            name: 'microphone',
            props: {},
          },
          {
            component: Speaker,
            name: 'speaker',
            props: {},
          },
          {
            component: Camera,
            name: 'camera',
            props: {},
          },
        ],
        [
          {
            component: Hangup,
            name: '',
            props: {
              showText: false,
            },
          },
        ],
      ],
    },
  },
};

export const ButtonPanelConfig = {
  pc: ButtonPanelPCConfig,
  h5: ButtonPanelH5Config,
};
