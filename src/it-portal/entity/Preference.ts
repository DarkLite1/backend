import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'
import { Account } from '@it-portal/entity/Account'

@ObjectType()
@Entity()
export class Preference extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field(() => Account)
  @OneToOne(() => Account, (account) => account.preference)
  account: Account

  @Field()
  @Column({ length: 5, default: 'en-us' })
  language: string

  @Field()
  @Column({ default: false })
  darkMode: boolean

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
