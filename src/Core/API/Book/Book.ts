export interface BookResult {
  title: string
  key: string
  authors: Author[]
  type: KeyItem
  description: string | KeyValue
  covers: number[]
  first_publish_date: string
  subject_places: string[]
  subjects: string[]
  subject_people: string[]
  subject_times: string[]
  location: string
  latest_revision: number
  revision: number
  created: KeyValue
  last_modified: LastModified
}

export interface Author {
  author: KeyItem
  type: KeyItem
}

export interface KeyItem {
  key: string
}


export interface KeyValue {
  type: string
  value: string
}

export interface LastModified {
  type: string
  value: string
}

export interface RatingResult {
  summary: Summary
  counts: Counts
}

export interface Summary {
  average: number
  count: number
  sortable: number
}

export interface Counts {
  "1": number
  "2": number
  "3": number
  "4": number
  "5": number
}
