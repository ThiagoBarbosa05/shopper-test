export class GlobalErrorHandler extends Error {

  private _error_code: string
  private _error_description: string

  constructor(errorCode: string, errorDescription: string) {
    super()
    this._error_code= errorCode
    this._error_description = errorDescription
  }

  get errorCode() {
    return this._error_code
  }

  get errorDescription() {
    return this._error_description
  }
}