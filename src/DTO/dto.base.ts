export class DTOBase {
  public readonly success!: boolean
  public readonly data?: unknown
  public readonly error?: any
  public readonly message?: string

  constructor (dto: DTOBase) {
    this.success = dto.success
    this.data = dto.data
    this.error = dto.error
    this.message = dto.message
  }
}
