import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum EventType {
  CREATED = "CREATED",
  UPDATED = "UPDATED",
  DELETED = "DELETED",
  SYNCRONIZED = "SYNCRONIZED"
}

@Entity('prm_user_event')
export class UserEvent extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'user_id', type: 'integer'})
  userId: number;

  @Column({
      name: 'event_type',
      type: "enum",
      enum: [EventType.CREATED, EventType.UPDATED, EventType.DELETED, EventType.SYNCRONIZED],
      default: EventType.CREATED
  })
  eventType: EventType;

  @Column({name: 'event_data', type: 'text'})
  eventData: string;

  @Column({name: 'seed', type: 'text'})
  seed: string;

  @Column({name: 'app_id', type: 'text'})
  appId: string;

  @CreateDateColumn({ name: 'created_at' }) 'created_at': Date;  

}
