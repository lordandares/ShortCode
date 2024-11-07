import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class Link {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  originalUrl: string;

  @Column()
  reducedUrl: string;

  @Column()
  title: string;

  @Column({ type: 'int', default: 0 })
  frequency: number;

  @Column({ unique: true })
  @Index()
  shortCode: string;
}
