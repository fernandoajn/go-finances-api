import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateRelationBetweenTransactionAndCategory1587492907247
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('transactions', 'category');

    await queryRunner.addColumn(
      'transactions',
      new TableColumn({
        name: 'category_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        name: 'TransactionCategory',
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'categories',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('transactions', 'TransactionCategory');

    await queryRunner.dropColumn('transactions', 'category_id');

    await queryRunner.addColumn(
      'transactions',
      new TableColumn({
        name: 'category',
        type: 'varchar',
      }),
    );
  }
}
