import program from 'commander'

import PackageInformation from '../../package.json'

const { version } = PackageInformation

export default () => {
  program
    .version(version, '-v, --version')
    .command('issues <owner> <repo>', 'export issues')
    .command('users <owner> <repo>', 'export users related issues')
    .command('labels <owner> <repo>', 'export labels related issues')
    .parse(process.argv)
}
