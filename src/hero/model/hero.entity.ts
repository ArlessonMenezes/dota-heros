import { User } from "src/user/model/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Hero {
  @PrimaryGeneratedColumn()
  idHero: number;

  @Column()
  name: string;
  
  @Column()
  breed: string;

  @Column()
  description: string;

  @Column()
  typeHero: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.heros)
  @JoinColumn({
    name:'idUser',
    referencedColumnName: 'idUser',
  })
  user: User;
}