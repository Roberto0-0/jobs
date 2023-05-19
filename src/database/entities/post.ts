import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Company } from "./company";
import { Push } from "./push";
import { Resume } from "./resume";

@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id: string
  
  @Column({
    type: "varchar",
    nullable: false
  })
  company_name: string
  
  @Column({
    type: "varchar",
    nullable: false
  })
  vacancy: string
  
  @Column({
    type: "varchar",
    nullable: false
  })
  location: string
  
  @Column({
    type: "int",
    nullable: false
  })
  salary: number
  
  @Column({
    type: "int",
    nullable: false
  })
  vacancies: number
  
  @Column({
    type: "text",
    nullable: true
  })
  information: string
  
  @Column({
    type: "int",
    nullable: false,
    default: 0
  })
  pushes: number

  @Column({
    type: "varchar",
    nullable: false
  })
  company_id: string
  
  @ManyToOne(() => Company, (company) => company.post, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE' 
  })
  company: Company
  
  @OneToMany(() => Push, (push) => push.post, {
    cascade: true,
  })
  push: Push[]

  @OneToMany(() => Resume, (resume) => resume.post)
  resume: Resume[]
  
  @CreateDateColumn()
  created_at: Date
  
  @UpdateDateColumn()
  updated_at: Date
}
