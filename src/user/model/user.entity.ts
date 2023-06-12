import { Hero } from "src/hero/model/hero.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  idUser: number;

  @Column()
  username: string;
  
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  typeUser: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Hero, (hero) => hero.user)
  heros: Hero[];
}