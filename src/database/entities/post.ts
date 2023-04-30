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
import { Like } from "./like";

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
    vancancy: string
    
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
    likes: number
    
    @ManyToOne(() => Company, (company) => company.post, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' 
    })
    company: Company
    
    @OneToMany(() => Like, (like) => like.post, {
        cascade: true,
    })
    like: Like[]
    
    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date
}
