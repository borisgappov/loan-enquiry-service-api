import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('loan_balance')
export class LoanBalanceEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  default: boolean;

  @Column()
  balance: number;
}
