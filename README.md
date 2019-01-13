# gie

Github issues exporter

## Getting Started

```console
npm install @januswel/gie
```

## Usage

```
import { Issue } from '@januswel/gie'

const owner = 'januswel'
const repo = 'gie'
Issue.getAll(owner, repo).then(issues => {
  console.log(issues)
})
```

## CLI

```console
npx @januswel/gie issues januswel gie
```

in CSV

```console
npx @januswel/gie issues januswel gie --csv
```
