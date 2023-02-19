import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Post } from "./post";
import { User } from "./user";

@Entity("likes")
export class Like {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({
    type: "boolean",
    nullable: false,
    default: false
  })
  liked: boolean

  @Column({
    type: "varchar",
    nullable: false
  })
  user_id: string

  @Column({
    type: "varchar",
    nullable: false
  })
  post_id: string

  @ManyToOne(() => User, (user) => user.like)
  user: User

  @ManyToOne(() => Post, (post) => post.like)
  post: Post

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
