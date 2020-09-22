import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Field, Int, ObjectType } from 'type-graphql'
import { Account } from '@it-portal/entity/Account'

@ObjectType()
@Entity()
export class Preference extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(() => Account, account => account.preference)
  account: Account

  @Field()
  @Column({ length: 5, default: 'en-us' })
  language: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
