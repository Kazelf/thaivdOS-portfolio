const INITIAL_Z_INDEX = 1000;

const createWindowState = () => ({
  isOpen: false,
  isMinimized: false,
  isFullscreen: false,
  zIndex: INITIAL_Z_INDEX,
  data: null,
  bounds: null,
  lastNormalBounds: null,
});

const WINDOW_CONFIG = {
  finder: createWindowState(),
  contact: createWindowState(),
  resume: createWindowState(),
  safari: createWindowState(),
  spotify: createWindowState(),
  vscode: createWindowState(),
  photos: createWindowState(),
  terminal: createWindowState(),
  wordle: createWindowState(),
  txtfile: createWindowState(),
  imgfile: createWindowState(),
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };
