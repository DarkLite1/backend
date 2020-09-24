import { createConnections, getConnection } from 'typeorm'

export const openDatabaseConnection = async () => {
  await createConnections()
}

export const closeDatabaseConnection = async (connectionName = 'default') => {
  const defaultConnection = getConnection(connectionName)
  await defaultConnection.close()
}

export const clearTable = async (
  tableName: string[] = ['account', 'preference'],
  connectionName = 'default'
) => {
  try {
    const connection = getConnection(connectionName)

    const promises = tableName.map((table) =>
      connection.query(`DELETE FROM ${table}`)
    )
    await Promise.all(promises)
  } catch (error) {
    throw new Error(
      `Failed to clear table '${tableName}' on database '${connectionName}': ${error}`
    )
  }
}

export const runQuery = async (query: string, connectionName = 'default') => {
  try {
    const connection = getConnection(connectionName)
    return await connection.query(query)
  } catch (error) {
    throw new Error(
      `Failed to run query '${query}' on database '${connectionName}': ${error}`
    )
  }
}
