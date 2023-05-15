import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from "typeorm"
import { User } from "./user"
import { Post } from "./post"
import { Resume } from "./resume"

@Entity("companies")
export class Company {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({
    type: "varchar",
    nullable: false
  })
  employer: string

  @Column({
    type: "varchar",
    nullable: false,
    unique: true
  })
  company: string

  @Column({
    type: "varchar",
    nullable: false
  })
  location: string
  
  @Column({
    type: "varchar",
    nullable: false
  })
  aboutCompany: string

  @ManyToOne(() => User, (user) => user.company)
  user: User

  @OneToMany(() => Post, (post) => post.company, {
    cascade: true,
  })
  post: Post[]

  @OneToMany(() => Resume, (resume) => resume.company, {
    cascade: true,
  })
  resume: Resume[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
