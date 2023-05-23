import { CustomerEntity, LoanBalanceEntity, LoanEntity } from '@app/common';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import xlsx from 'node-xlsx';
import * as path from 'path';
import { DataSource } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(private readonly dataSource: DataSource) {}

  async seed() {
    const loanRepository = this.dataSource.getRepository(LoanEntity);
    const existingLoans = await loanRepository.find();
    if (existingLoans.length === 0) {
      const seedData = this.getSeedData();

      let queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        for (const data of seedData) {
          const loan = queryRunner.manager.create(LoanEntity, {
            id: data.id,
            loanDate: data.loanDate,
            customer: queryRunner.manager.create(CustomerEntity, data.customer),
          });
          await queryRunner.manager.save(loan);
        }
        await queryRunner.commitTransaction();
      } catch (err) {
        await queryRunner.rollbackTransaction();
      } finally {
        await queryRunner.release();
      }

      const loans = await loanRepository.find();
      queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        for (const loan of loans) {
          const obj = seedData.filter((e) => e.id === Number(loan.id))[0];

          let customer = queryRunner.manager.create(CustomerEntity, obj.customer);
          customer = await queryRunner.manager.save(customer);
          loan.customer = customer;

          let balance = queryRunner.manager.create(LoanBalanceEntity, obj.balance);
          balance = await queryRunner.manager.save(balance);
          loan.balance = balance;

          await queryRunner.manager.save(loan);
        }
        await queryRunner.commitTransaction();
      } catch (err) {
        await queryRunner.rollbackTransaction();
      } finally {
        await queryRunner.release();
      }

      console.log('Data seeded successfully!');
    } else {
      console.log('Data already seeded!');
    }
  }

  getSeedData(): LoanEntity[] {
    const dataFile = path.join(__dirname, '../../../apps/loans/assets/loan-dataset.xlsx');
    const data = xlsx.parse(fs.readFileSync(dataFile), {
      cellDates: true,
      dateNF: 'mm/dd/yy',
    });
    const rows = data[0].data;
    const loans: LoanEntity[] = rows.slice(1).map((e) => {
      return {
        id: Number('0x' + e[0]),
        loanDate: new Date(e[1]),
        customer: {
          age: e[2],
          job: e[3],
          marital: e[4],
          education: e[5],
        } as CustomerEntity,
        balance: {
          default: e[6] === 'yes',
          balance: e[7],
        } as LoanBalanceEntity,
      } as LoanEntity;
    });
    return loans.sort((a, b) => (a.id > b.id ? 1 : -1));
  }
}
