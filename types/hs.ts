export interface HSItem {
  code: string
  description: string
  chapter?: string
  section?: string
}

export interface HSMatch {
  hs_code: string
  description: string
  score: number
  chapter?: string
  section?: string
}
