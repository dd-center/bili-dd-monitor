require('dotenv').config()
const { notarize } = require('electron-notarize')

exports.default = ({ electronPlatformName, appOutDir, packager }) => {
  if (electronPlatformName !== 'darwin') {
    return
  }

  const appName = packager.appInfo.productFilename

  return notarize({
    appBundleId: 'com.electron.biliddmonitor',
    appPath: `${appOutDir}/${appName}.app`,
    appleId: process.env.APPLEID,
    appleIdPassword: process.env.APPLEIDPASS
  })
}
