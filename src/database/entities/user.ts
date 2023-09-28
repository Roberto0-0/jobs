import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm"
import { Push } from "./push"
import { Resume } from "./resume"
import { Address } from "./address"

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

  @OneToOne(() => Address, (address)  => address.user, {
    cascade: true,
  })
  address: Address

  @OneToMany(() => Resume, (resume) => resume.user, {
    cascade: true,
  })
  resume: Resume[]

  @OneToMany(() => Push, (push) => push.user)
  push: Push[]
  
  @CreateDateColumn()
  created_at: Date
  
  @UpdateDateColumn()
  updated_at: Date
}
