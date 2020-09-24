import {
  openDatabaseConnection,
  closeDatabaseConnection,
  clearTables,
} from '@test-utils/helpers/database'

beforeAll(async () => {
  await openDatabaseConnection()
  await clearTables()
})

afterAll(async () => {
  await closeDatabaseConnection()
})
