import { build } from 'electron-builder';

build({
  config: {
    appId: 'com.example.app',
    productName: 'Electron Template',
    copyright: '',
    artifactName: '${name}-${version}-${platform}-${arch}.${ext}',
    files: ['dist/**/*'],
    directories: {
      output: 'release',
      buildResources: 'assets',
    },
    win: {
      icon: 'assets/icon.ico',
    },
    mac: {
      identity: null,
      icon: 'assets/icon.icns',
    },
    linux: {
      category: 'Utility',
      asarUnpack: ['dist/assets/icon.png'],
    },
  },
})
  .then(() => console.log('Completed.'))
  .catch((err) => console.log(err));
