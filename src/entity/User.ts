import { IsEmail, IsEnum, Length } from 'class-validator'
import { Entity, Column, OneToMany } from 'typeorm'

import Model from './Model'
import { Game } from './Game'

@Entity('users')
export class User extends Model {
  @Column()
  @Length(1, 255)
  name: string

  @Column()
  @Length(1, 255)
  @IsEmail()
  email: string

  @Column({
    type: 'enum',
    enum: ['user', 'admin'],
    default: 'user',
  })
  @IsEnum(['user', 'admin', undefined])
  role: string

  @OneToMany(() => Game, (game) => game.user)
  games: Game[]
}
