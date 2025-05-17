import { BaseEntity } from '@common/database';
import { EReviewStatus } from '@common/enums';
import { HiringEntity, UserEntity } from '@entities';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'reviews',
  timestamps: true,
})
export class ReviewEntity extends BaseEntity<ReviewEntity> {
  @ForeignKey(() => HiringEntity)
  @Column({
    field: 'hiring_id',
    type: DataType.UUID,
    allowNull: false,
  })
  declare hiringId: string;

  @BelongsTo(() => HiringEntity, 'hiringId')
  hiring: HiringEntity;

  @ForeignKey(() => UserEntity)
  @Column({
    field: 'reviewer_id',
    type: DataType.UUID,
    allowNull: false,
  })
  declare reviewerId: string;

  @Column({
    field: 'rating',
    type: DataType.SMALLINT,
    allowNull: false,
  })
  declare rating: number;

  @Column({
    field: 'comment',
    type: DataType.TEXT,
    allowNull: true,
  })
  declare comment: string;

  @Column({
    field: 'status',
    type: DataType.ENUM(...Object.values(EReviewStatus)),
    allowNull: false,
    defaultValue: EReviewStatus.PENDING,
  })
  declare status: EReviewStatus;

  @BelongsTo(() => UserEntity, 'reviewerId')
  reviewer: UserEntity;
}
