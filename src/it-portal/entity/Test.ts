import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
} from 'typeorm'
import { Field, Int, ObjectType } from 'type-graphql'

// const db1Connection = getConnection('backend-connection')
// getConnection('backend-connection')

@ObjectType()
@Entity()
// @Entity({database: 'IT-Portal'})
export class Test extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  title: string

  @Field()
  @Column()
  duration: number
}
