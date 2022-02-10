// success: [true/false]
// error: [string] = A descriptive error that is intended primarily for system operators/developers.
// data [string] = A raw dump of the error object.
// (optional) errorCode: [string] = A machine readable/switcheable string that the client can take programmatic action on.
// (optional) safeError: [string] = An error intended to be safe to show to the end user.

export const serviceError = (e: unknown, error: string, safeError?: string, errorCode?: string) => {
  if (!safeError) safeError = error
  if (!errorCode) errorCode = 'SERVICE_ERROR'

  return { success: false, errorCode, error, safeError, data: String(e) }
}
