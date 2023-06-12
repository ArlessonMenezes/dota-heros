import { Hero } from 'src/hero/model/hero.entity';
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  idSkill: number;

  @Column()
  skillOne: string;

  @Column()
  skillTwo: string;

  @Column()
  skillThree: string;

  @Column()
  ultimate: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => Hero, (hero) => hero.skill)
  hero: Hero;
}