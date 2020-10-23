import { IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50, nullable: true })
    @IsString()
    @IsOptional()
    @MinLength(8, { message: 'el nombre debe tener mas 8 letras' })
    @MaxLength(50, {message: 'el nombre no puede superar los 50 letras'})
    name: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    @IsString()
    @IsOptional()
    @MinLength(8, { message: 'Los apellidos debe tener mas 8 letras' })
    @MaxLength(50, {message: 'Los apellidos no puede superar los 50 letras'})
    lastName: string;

    @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
    @IsString()
    @IsEmpty()
    @MinLength(8, { message: 'usuario debe tener mas 8 letras' })
    @MaxLength(50, { message: 'usuario no puede superar los 50 letras' })
    username: string

    @Column({ type: 'varchar', length: 255, nullable: false })
    @IsString()
    @IsEmpty()
    @MinLength(8, { message: 'usuario debe tener mas 8 letras' })
    @MaxLength(20, { message: 'usuario no puede superar los 20 letras' })
    password: string

    @Column({ type: 'varchar', length: 150, unique: true, nullable: false })
    @IsEmail()
    @IsEmpty()
    @MinLength(8, { message: 'usuario debe tener mas 8 letras' })
    @MaxLength(150, { message: 'usuario no puede superar los 150 letras' })
    email: string

    @Column()
    @IsString()
    @IsNotEmpty()
    role: string

    @Column()
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @Column()
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date
}
