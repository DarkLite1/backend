import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm'
import { Field, Int, ObjectType } from 'type-graphql'
import { Preference } from '@it-portal/entity/Preference'

@ObjectType()
@Entity()
export class Account extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column({ length: 50, unique: true })
  @Index({ unique: true })
  accountIdentifier: string

  @Field({ nullable: true })
  @Column({ nullable: true, length: 100 })
  name?: string

  @Field({ nullable: true })
  @Column({ nullable: true, length: 100 })
  userName?: string

  @OneToOne(() => Preference, (preference) => preference.account)
  @JoinColumn()
  preference: Preference

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
