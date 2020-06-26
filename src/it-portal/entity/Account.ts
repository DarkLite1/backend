import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Field, Int, ObjectType } from 'type-graphql'
import { MaxLength } from 'class-validator'

@ObjectType()
@Entity()
export class Account extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @MaxLength(10)
  @Column({ length: 50, unique: true })
  @Index({ unique: true })
  accountIdentifier: string

  @Field({ nullable: true })
  @Column({ nullable: true, length: 100 })
  name?: string

  @Field({ nullable: true })
  @Column({ nullable: true, length: 100 })
  userName?: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
