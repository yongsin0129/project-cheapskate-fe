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

// 簡化寫化 :　1.不需要宣告　2.不需要 this 指定屬性 3.直接寫在建構函式的參數中
// export class DTOBase {
//   constructor (
//     public readonly success: boolean,
//     public readonly data?: unknown,
//     public readonly error?: any,
//     public readonly message?: string
//   ) {}
// }
