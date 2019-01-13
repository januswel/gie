import program from 'commander'

import PackageInformation from '../../package.json'
import * as Issue from '../github/issue'
import * as CSV from '../csv'
import csvMappingsLabels from './csv-mappings-labels'

const { version } = PackageInformation

export default () => {
  program
    .version(version, '-v, --version')
    .arguments('<owner> <repo>')
    .option('-c, --csv', 'output in CSV')
    .action((owner, repo, options) => {
      Issue.getAll(owner, repo)
        .then(issues => {
          const labels = Issue.extractLabels(issues)
          if (options.csv) {
            process.stdout.write(`${CSV.stringify(labels, csvMappingsLabels)}`)
            return
          }
          process.stdout.write(`${JSON.stringify(labels)}\n`)
        })
        .catch(e => {
          process.stderr.write(`${e.message}\n`)
        })
    })
    .parse(process.argv)
}
