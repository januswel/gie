import program from 'commander'

import PackageInformation from '../../package.json'
import * as Issue from '../github/issue'
import * as CSV from '../csv'
import csvMappingsUsers from './csv-mappings-users'

const { version } = PackageInformation

export default () => {
  program
    .version(version, '-v, --version')
    .arguments('<owner> <repo>')
    .option('-c, --csv', 'output in CSV')
    .action((owner, repo, options) => {
      Issue.getAll(owner, repo)
        .then(issues => {
          const users = Issue.extractUsers(issues)
          if (options.csv) {
            process.stdout.write(`${CSV.stringify(users, csvMappingsUsers)}`)
            return
          }
          process.stdout.write(`${JSON.stringify(users)}\n`)
        })
        .catch(e => {
          process.stderr.write(`${e.message}\n`)
        })
    })
    .parse(process.argv)
}
