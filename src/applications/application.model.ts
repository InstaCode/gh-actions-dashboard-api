import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Application {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text', nullable: false })
  name!: string;

  @Column({ type: 'text', nullable: false })
  branchPrefix!: string;
}
