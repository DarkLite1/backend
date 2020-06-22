import {
  openDatabaseConnection,
  closeDatabaseConnection,
} from '@test-utils/helpers/database'

beforeAll(async () => {
  await openDatabaseConnection()
})

afterAll(async () => {
  await closeDatabaseConnection()
})
