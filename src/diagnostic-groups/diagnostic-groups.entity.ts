import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'diagnostics_groups',
})
export class DiagnosticsGroupsEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({
    nullable: true,
  })
  diagnostics: string;

  @Column({
    nullable: true,
  })
  diagnostic_metrics: string;
}
