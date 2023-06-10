import { Hero } from "src/hero/model/hero.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

  @OneToOne(() => Hero, (hero) => hero.skill)
  @JoinColumn({
    name: 'idHero',
    referencedColumnName: 'idHero',
  })
  hero: Hero;
}