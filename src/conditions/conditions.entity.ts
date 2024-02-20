import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'conditions',
})
export class ConditionsEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  diagnostic_metrics: string;
}
