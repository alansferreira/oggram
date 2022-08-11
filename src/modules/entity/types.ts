export interface Entity<
  EnvelopeSpec,
  EntityAnnotations extends { [x: string]: any }
> {
  /**
   * Unique name on entire database
   */
  name: string
  description?: string
  /**
   * Must be an Group or User name
   */
  owner?: string
  annotations?: EntityAnnotations

  spec?: EnvelopeSpec
}

export interface GroupSpec {
  /**
   * Must be an Group name
   */
  memberOf?: string[]
}

export interface GroupAnnotations {
  [x: string]: any
  'rchlo/product'?: string
}

export type Group = Entity<GroupSpec, GroupAnnotations>

export interface UserSpec {
  /**
   * Must be an Group name
   */
  memberOf?: string[]
}

export interface UserAnnotations {
  [x: string]: any
}

export type User = Entity<UserSpec, UserAnnotations>
