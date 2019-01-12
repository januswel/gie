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

export const getAll = (owner: Owner, repository: Repository) => {
  const api = `/repos/${owner}/${repository}/issues`
  return API.request(api)
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
