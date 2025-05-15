import { BaseEntity } from '@common/database';
import { UserEntity } from '@entities';
import { BelongsTo, Column, DataType, Table } from 'sequelize-typescript';

@Table({
  tableName: 'notifications',
  timestamps: true,
})
export class NotificationEntity extends BaseEntity<NotificationEntity> {
  @Column({
    field: 'user_id',
    type: DataType.UUID,
    allowNull: false,
  })
  declare userId: string;

  @Column({
    field: 'message',
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare message: string;

  @Column({
    field: 'is_read',
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare isRead: boolean;

  @BelongsTo(() => UserEntity, 'userId')
  user: UserEntity;
}
