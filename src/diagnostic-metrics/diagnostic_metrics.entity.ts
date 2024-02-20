import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'diagnostic_metrics',
})
export class DiagnosticMetricsEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  oru_sonic_codes: string;

  @Column({
    nullable: true,
  })
  diagnostic: string;

  @Column({
    nullable: true,
  })
  diagnostic_groups: string;

  @Column({
    nullable: true,
  })
  oru_sonic_units: string;

  @Column({
    nullable: true,
  })
  units: string;

  @Column({
    nullable: true,
  })
  min_age: string;

  @Column({
    nullable: true,
  })
  max_age: string;

  @Column({
    nullable: true,
  })
  gender: string;

  @Column({
    nullable: true,
  })
  standard_lower: string;

  @Column({
    nullable: true,
  })
  standard_higher: string;

  @Column({
    nullable: true,
  })
  everlab_lower: string;

  @Column({
    nullable: true,
  })
  everlab_higher: string;
}
