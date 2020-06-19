import { createConnections, getConnection } from 'typeorm'

export const connectDatabase = async () => {
  await createConnections()
}

export const closeDatabaseConnection = async (connectionName = 'default') => {
  const defaultConnection = getConnection(connectionName)
  await defaultConnection.close()
}

export const clearTable = async (
  tableName: string,
  connectionName = 'default'
) => {
  try {
    const connection = getConnection(connectionName)
    await connection.query(`DELETE FROM ${tableName}`)
  } catch (error) {
    throw new Error(`Failed to clear table '${tableName}': ${error}`)
  }
}
