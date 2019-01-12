import program from 'commander'

import PackageInformation from '../../package.json'
import * as Issue from '../github/issue'

const { version } = PackageInformation

export default () => {
  program
    .version(version, '-v, --version')
    .arguments('<owner> <repo>')
    .action((owner, repo) => {
      Issue.getAll(owner, repo)
        .then(issues => {
          process.stdout.write(`${JSON.stringify(issues)}\n`)
        })
        .catch(e => {
          process.stderr.write(`${e.message}\n`)
        })
    })
    .parse(process.argv)
}
