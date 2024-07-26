export interface EditionResult {
    links: Links
    size: number
    entries: Entry[]
  }
  
  export interface Links {
    self: string
    work: string
    next: string
  }
  
  export interface Entry {
    type: Type
    authors?: Author[]
    isbn_13?: string[]
    languages?: Language[]
    pagination?: string
    publish_date?: string
    publishers?: string[]
    source_records?: string[]
    subjects?: string[]
    title: string
    weight?: string
    full_title?: string
    works: Work[]
    key: string
    covers?: number[]
    number_of_pages?: number
    latest_revision: number
    revision: number
    created: Created
    last_modified: LastModified
    identifiers?: Identifiers
    local_id?: string[]
    physical_format?: string
    isbn_10?: string[]
    ocaid?: string
    notes?: Notes
    subtitle?: string
    lc_classifications?: string[]
    description: any
    oclc_numbers?: string[]
    physical_dimensions?: string
    publish_country?: string
    work_titles?: string[]
    contributions?: string[]
    publish_places?: string[]
    other_titles?: string[]
    series?: string[]
    copyright_date?: string
    contributors?: Contributor[]
    translation_of?: string
    genres?: string[]
    edition_name?: string
    by_statement?: string
    first_sentence?: FirstSentence
    dewey_decimal_class?: string[]
    ia_box_id?: string[]
  }
  
  export interface Type {
    key: string
  }
  
  export interface Author {
    key: string
  }
  
  export interface Language {
    key: string
  }
  
  export interface Work {
    key: string
  }
  
  export interface Created {
    type: string
    value: string
  }
  
  export interface LastModified {
    type: string
    value: string
  }
  
  export interface Identifiers {
    librarything?: string[]
    goodreads?: string[]
    amazon?: string[]
    better_world_books?: string[]
  }
  
  export interface Notes {
    type: string
    value: string
  }
  
  export interface Contributor {
    role: string
    name: string
  }
  
  export interface FirstSentence {
    type: string
    value: string
  }
  