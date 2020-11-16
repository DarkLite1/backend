export const stripTrailingSlash = (str: string) => {
  return str.endsWith('/') ? str.slice(0, -1) : str
}

export const getBasicAuthString = (username: string, password: string) => {
  const token = username + ':' + password
  const hash = Buffer.from(token).toString('base64')
  return 'Basic ' + hash
}
