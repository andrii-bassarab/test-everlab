import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'diagnostics',
})
export class DiagnosticsEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  diagnostic_groups: string;

  @Column({
    nullable: true,
  })
  diagnostic_metrics: string;
}
