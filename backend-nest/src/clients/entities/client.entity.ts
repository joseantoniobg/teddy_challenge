import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 14 })
  document: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  wage: number;

  @Column({ name: 'company_evaluation', type: 'decimal', precision: 13, scale: 2 })
  companyEvaluation: number;

  @Column({ type: 'boolean', name: 'is_selected', default: false })
  isSelected: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;
}
