import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableUser1694192288714 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // TODO: Verificar porque não está dando pra adicionar e-mail único no banco de dados e remover o -- do código abaixo
    queryRunner.query(`
        -- alter table user add unique(email);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        -- alter table public.user remove unique(email);
    `);
  }
}
