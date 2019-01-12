import * as User from './user'

export interface Entity {
  url: string
  html_url: string
  labels_url: string
  id: number
  node_id: string
  number: number
  title: string
  description: string
  creator: User.Entity
  open_issues: number
  closed_issues: number
  state: string
  created_at: string
  updated_at: string
  due_on: string | null
  closed_at: string | null
}

export const getName = (milestone: Entity) => milestone.title
