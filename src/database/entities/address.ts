import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    OneToOne
} from "typeorm"
import { User } from "./user"

@Entity("address")
export class Address {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        type: "varchar",
        nullable: false
    })
    fullName: string

    @Column({
        type: "varchar",
        nullable: false
    })
    address: string

    @Column({
        nullable: false
    })
    dateOfBirth: Date

    @Column({
        type: "varchar",
        unique: true,
        nullable: false
    })
    phone: string

    @Column({
        type: "varchar",
        nullable: false
    })
    maritalStatus: string

    @Column({
        type: "varchar",
        nullable: false
    })
    academicEducation: string

    @Column({
        type: "varchar",
        nullable: false
    })
    user_id: string;
  
    @OneToOne(() => User, (user) => user.address, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'  
    })
    @JoinColumn({ name: "user_id" })
    user: User

    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date
}
