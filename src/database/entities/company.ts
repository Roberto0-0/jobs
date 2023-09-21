import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm"
import { Post } from "./post"
import { Push } from "./push"
import { Resume } from "./resume"
import { Complement } from "./complement"

@Entity("companies")
export class Company {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({
    type: "varchar",
    nullable: false
  })
  name: string;

  @Column({
    type: "varchar",
    nullable: false
  })
  surname: string;

  @Column({
    type: "varchar",
    nullable: false,
    unique: true
  })
  CNPJ: string

  @Column({
    type: "varchar",
    nullable: false,
    unique: true
  })
  company: string

  @Column({
    type: "varchar",
    nullable: false,
    unique: true
  })
  email: string

  @Column({
    type: "varchar",
    nullable: false,
    unique: true
  })
  password: string

  @OneToOne(() => Complement, (complement) => complement.company)
  complement: Complement

  @OneToMany(() => Post, (post) => post.company, {
    cascade: true,
  })
  post: Post[]

  @OneToMany(() => Resume, (resume) => resume.company, {
    cascade: true,
  })
  resume: Resume[]

  @OneToMany(() => Push, (push) => push.company)
  push: Push[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
