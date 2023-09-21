import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
} from "typeorm"
import { Company } from "./company"

@Entity("complements")
export class Complement {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        type: "varchar",
        nullable: false
    })
    sector: string;

    @Column({
        type: "int",
        nullable: false
    })
    employees: number;

    @Column({
        type: "varchar",
        nullable: false,
        unique: true
    })
    location: string

    @Column({
        type: "varchar",
        nullable: false,
        unique: true
    })
    description: string

    @Column({
        type: "varchar",
        nullable: false,
        unique: true
    })
    company_id: string

    @OneToOne(() => Company, (company) => company.complement)
    @JoinColumn({ name: "company_id" })
    company: Company

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}
  