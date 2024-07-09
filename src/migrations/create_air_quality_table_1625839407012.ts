import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAirQualityTable1625839407012 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'air_quality',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'longitude',
          type: 'double',
        },
        {
          name: 'latitude',
          type: 'double',
        },
        {
          name: 'aqi',
          type: 'int',
        },
        {
          name: 'main_pollutant',
          type: 'varchar',
        },
        {
          name: 'timestamp',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
        },
      ],
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('air_quality');
  }

}
