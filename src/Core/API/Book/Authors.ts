export interface AuthorResult {
    bio: string
    remote_ids: RemoteIds
    photos: number[]
    key: string
    alternate_names: string[]
    personal_name: string
    links: Link[]
    source_records: string[]
    type: KeyItem
    name: string
    birth_date: string
    death_date: string
    latest_revision: number
    revision: number
    created: ValueItem
    last_modified: ValueItem
  }
  
  export interface RemoteIds {
    viaf: string
    wikidata: string
    isni: string
  }
  
  export interface Link {
    title: string
    url: string
    type: KeyItem
  }
  
  export interface KeyItem {
    key: string
  }

  export interface ValueItem {
    type: string
    value: string
  }
  
 
  