import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LoanEntity } from './loan.entity';

@Entity('customer')
export class CustomerEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  age: number;

  @Column()
  job: string;

  @Column()
  marital: string;

  @Column()
  education: string;

  @OneToMany(() => LoanEntity, (loan) => loan.customer)
  @JoinTable()
  loans: LoanEntity[];
}
