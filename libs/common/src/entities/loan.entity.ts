import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { LoanBalanceEntity } from './loan-balance.entity';

@Entity('loan')
export class LoanEntity {
  @PrimaryColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'timestamptz', precision: 3 })
  loanDate: Date;

  @OneToOne(() => LoanBalanceEntity)
  @JoinColumn()
  balance: LoanBalanceEntity;

  @ManyToOne(() => CustomerEntity, (customer) => customer.loans)
  @JoinTable()
  customer: CustomerEntity;
}
