import * as API from './api'
import * as User from './user'
import * as Label from './label'
import * as Milestone from './milestone'

interface Entity {
  readonly url: string
  readonly repository_url: string
  readonly labels_url: string
  readonly comments_url: string
  readonly events_url: string
  readonly html_url: string
  readonly id: number
  readonly node_id: string
  readonly number: number
  readonly title: string
  readonly user: User.Entity
  readonly labels: Array<Label.Entity>
  readonly state: 'open' | 'closed'
  readonly locked: boolean
  readonly assignee: User.Entity
  readonly assignees: Array<User.Entity>
  readonly milestone: Milestone.Entity | null
  readonly comments: number
  readonly created_at: Date
  readonly updated_at: Date
  readonly closed_at: Date | null
  readonly author_association: string
  readonly body: string
}

type Owner = string
type Repository = string

const ITEMS_PER_PAGE = 1000
const INITIAL_PAGE = 1
const SECOND_PAGE = 2

const OPTIONS = {
  state: 'all',
  per_page: ITEMS_PER_PAGE,
  page: '$page',
}

const buildQuery = (options: { [key: string]: any }) =>
  Object.keys(options)
    .map(key => `${key}=${options[key].toString()}`)
    .join('&')

export const getPage = (owner: Owner, repository: Repository, page: number = INITIAL_PAGE) => {
  const query = buildQuery(OPTIONS).replace('$page', page.toString())
  const api = `/repos/${owner}/${repository}/issues?${query}`
  console.error(api)
  return API.request(api)
}

export const getAll = async (owner: Owner, repository: Repository) => {
  const initialPage = await getPage(owner, repository)
  const { lastPageNumber } = initialPage

  if (lastPageNumber) {
    const pages = []
    for (let pageNumber = SECOND_PAGE; pageNumber <= lastPageNumber; ++pageNumber) {
      pages.push(getPage(owner, repository, pageNumber))
    }
    return Promise.all(pages).then(results =>
      results.reduce((result: Array<Object>, current: { body: Object }) => {
        result.concat(current.body)
        return result
      }, initialPage.body),
    )
  }

  return initialPage.body
}

interface Users {
  [id: string]: User.Entity
}
export const extractUsers = (issues: Array<Entity>) =>
  Object.values(
    issues.reduce((users: Users, issue: Entity) => {
      const userCreatedThis = issue.user
      users[userCreatedThis.id] = userCreatedThis
      issue.assignees.forEach((user: User.Entity) => {
        users[user.id] = user
      })
      return users
    }, {}),
  )
interface Labels {
  [id: string]: Label.Entity
}
export const extractLabels = (issues: Array<Entity>) =>
  Object.values(
    issues.reduce((labels: Labels, issue: Entity) => {
      issue.labels.forEach((label: Label.Entity) => {
        labels[label.id] = label
      })
      return labels
    }, {}),
  )
