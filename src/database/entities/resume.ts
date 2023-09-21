import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm"
import { User } from "./user"
import { Company } from "./company"
import { Post } from "./post"

@Entity("resumes")
export class Resume {
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
        type: "text",
        nullable: false
    })
    information: string

    @Column({
        type: "varchar",
        nullable: false,
        default: "waiting"
    })
    status: string

    @Column({
        type: "boolean",
        default: false,
        nullable: false
    })
    alteration: boolean

    @Column({
        type: "varchar",
        nullable: false
    })
    user_id: string;

    @Column({
        type: "varchar",
        nullable: false
    })
    company_id: string;

    @Column({
        type: "varchar",
        nullable: false
    })
    post_id: string

    @ManyToOne(() => User, (user) => user.resume, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'  
    })
    user: User

    @ManyToOne(() => Company, (company) => company.resume, {
        onUpdate: 'CASCADE',
    })
    company: Company

    @ManyToOne(() => Post, (post) => post.resume, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' 
    })
    post: Post

    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date
}
