import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm"
import { Push } from "./push"
import { Resume } from "./resume"

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string
  
  @Column({ 
    type: "varchar",
    nullable: false
    })
  name: string
  
  @Column({ 
    type: "varchar",
    unique: true,
    nullable: false
  })
  email: string
  
  @Column({ 
    type: "varchar",
    nullable: false
  })
  password: string

  @OneToMany(() => Push, (push) => push.user)
  push: Push[]

  @OneToMany(() => Resume, (resume) => resume.user, {
    cascade: true,
  })
  resume: Resume[]
  
  @CreateDateColumn()
  created_at: Date
  
  @UpdateDateColumn()
  updated_at: Date
}
