/* eslint-disable prettier/prettier */

/*
  nest에서의 entity는 node에서의 model과 비슷한 역할을 한다.

  즉, 쉽게 말하자면, DB의 Table구조를 코드로 작성해놓았다고 보면 될 것 같다.
*/

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  //PK column
  @PrimaryGeneratedColumn()
  userID: number;

  @Column()
  userName: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  email: string;

  @CreateDateColumn()
  createdAt: Date;
}
