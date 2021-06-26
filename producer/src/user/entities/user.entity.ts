import { PrimaryGeneratedColumn, Column, Entity, BaseEntity, CreateDateColumn } from 'typeorm';

@Entity('prm_user')
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  seed: string;

  @Column({name: 'app_id'})
  appId: string;

  @CreateDateColumn({ name: 'created_at' }) 'created_at': Date;  

}
