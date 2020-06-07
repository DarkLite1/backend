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
    console.log('in kiwi')

    return await getRepository(Kiwi, 'it-portal').find()
    // const k = await getRepository(Kiwi).find()
    // console.log('return from kiwi')

    // return k
  }
  // @Query(() => [Kiwi])
  // kiwi() {
  //   return async () => await getRepository(Kiwi).find()
  // }
}
