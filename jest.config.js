module.exports = {
  moduleFileExtensions: ['js'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  modulePaths: ['<rootDir>/src/'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'https://test.okteto.net',
    pretendToBeVisual: true,
    beforeParse(window) {
      window.document.childNodes.length === 0;
      window.alert = (msg) => console.log(msg);
      window.open = () => {};
    },
  },
};
