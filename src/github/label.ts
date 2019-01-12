export interface Entity {
  readonly id: number
  readonly node_id: string
  readonly url: string
  readonly name: string
  readonly color: string
  readonly default: boolean
}

export const getName = (label: Entity) => label.name
