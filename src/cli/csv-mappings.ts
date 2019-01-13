import * as User from '../github/user'
import * as Label from '../github/label'
import * as Milestone from '../github/milestone'

export default [
  'id',
  'number',
  'state',
  'locked',
  'title',
  'body',
  {
    key: 'user',
    header: 'created by',
    summarize: (value: User.Entity) => User.getName(value),
  },
  {
    key: 'assignees',
    summarize: (values: Array<User.Entity>) => values.map(User.getName),
  },
  {
    key: 'labels',
    summarize: (values: Array<Label.Entity>) => values.map(Label.getName),
  },
  {
    key: 'milestone',
    summarize: (value: Milestone.Entity) => (value ? Milestone.getName(value) : ''),
  },
  'url',
  {
    key: 'created_at',
    header: 'created at',
  },
  {
    key: 'updated_at',
    header: 'updated at',
  },
  {
    key: 'closed_at',
    header: 'closed at',
  },
]
