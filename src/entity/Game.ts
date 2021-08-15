import { Entity, Column, ManyToOne } from 'typeorm'

import Model from './Model'

import { User } from './User'

@Entity('games')
export class Game extends Model {
  @Column()
  title: string

  @Column()
  body: string

  @ManyToOne(() => User)
  user: User
}
