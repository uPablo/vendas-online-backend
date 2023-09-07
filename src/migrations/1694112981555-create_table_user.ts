import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUser1694112981555 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            CREATE TABLE public.user (
                id INTEGER NOT NULL,
                name character varying NOT NULL,
                email character varying NOT NULL,
                cpf character varying NOT NULL,
                type_user int NOT NULL,
                phone character varying NOT NULL,
                password character varying NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT now(),
                updated_at TIMESTAMP NOT NULL DEFAULT now(),
                primary key (id)
            );

            CREATE SEQUENCE IF NOT EXISTS public.user_id_seq
                as integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;

            ALTER SEQUENCE public.user_id_seq OWNED BY public.user.id;

            ALTER TABLE ONLY public.user ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        drop table public.user
    `);
  }
}
