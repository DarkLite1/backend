import {
    openDatabaseConnection,
    closeDatabaseConnection,
  } from '../helpers/database'

beforeAll(async () => {
  await openDatabaseConnection()
})

afterAll(async () => {
  await closeDatabaseConnection()
})
