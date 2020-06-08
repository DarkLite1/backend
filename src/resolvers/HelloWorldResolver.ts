import { Query, Resolver } from 'type-graphql'
import { Kiwi } from '../it-portal/entity/Kiwi'
import { getRepository } from 'typeorm'

@Resolver()
export class HelloWorldResolver {
  @Query(() => String)
  hello() {
    return 'hi!'
  }

  @Query(() => [Kiwi])
  async kiwi() {
    return await getRepository(Kiwi, 'it-portal').find()
  }
  // @Query(() => [Kiwi])
  // kiwi() {
  //   return async () => await getRepository(Kiwi).find()
  // }
}
