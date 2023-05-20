import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Company } from "./company";
import { Post } from "./post";
import { User } from "./user";

@Entity("pushes")
export class Push {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({
    type: "boolean",
    nullable: false,
    default: false
  })
  pushed: boolean

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
  
  @Column({
    type: "varchar",
    nullable: false
  })
  company_id: string
 
  @ManyToOne(() => User, (user) => user.push)
  @JoinColumn({ name: "user_id" })
  user: User

  @ManyToOne(() => Post, (post) => post.push, {
     onUpdate: 'CASCADE',
     onDelete: 'CASCADE' 
  })
  @JoinColumn({ name: "post_id" })
  post: Post

  @ManyToOne(() => Company, (company) => company.push)
  @JoinColumn({ name: "company_id" })
  company: Company

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
