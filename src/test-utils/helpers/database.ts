import { createConnections, getConnection } from 'typeorm'

export const tableName = {
  account: 'account',
  preference: 'preference',
}

export const openDatabaseConnection = async () => {
  await createConnections()
}

export const closeDatabaseConnection = async (connectionName = 'default') => {
  const defaultConnection = getConnection(connectionName)
  await defaultConnection.close()
}

export const clearTables = async (
  tableNames: string[] = [tableName.account, tableName.preference],
  connectionName = 'default'
) => {
  try {
    const connection = getConnection(connectionName)

    const promises = tableNames.map((table) =>
      connection.query(`DELETE FROM ${table}`)
    )
    await Promise.all(promises)
  } catch (error) {
    throw new Error(
      `Failed to clear table '${tableNames}' on database '${connectionName}': ${error}`
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
