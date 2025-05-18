import { BaseEntity } from '@common/database';
import { EPaymentMethod, EPaymentStatus } from '@common/enums';
import { Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { HiringEntity } from './hiring.entity';

@Table({
  tableName: 'payments',
  timestamps: true,
})
export class PaymentEntity extends BaseEntity<PaymentEntity> {
  @ForeignKey(() => HiringEntity)
  @Column({
    field: 'hiring_id',
    type: DataType.UUID,
    allowNull: false,
  })
  hiringId: string;

  @Column({
    field: 'payment_method',
    type: DataType.ENUM(...Object.values(EPaymentMethod)),
    allowNull: false,
  })
  paymentMethod: EPaymentMethod;

  @Column({
    field: 'amount',
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  amount: number;

  @Column({
    field: 'status',
    type: DataType.ENUM(...Object.values(EPaymentStatus)),
    allowNull: false,
    defaultValue: EPaymentStatus.PENDING,
  })
  status: string;

  @Column({
    field: 'transaction_id',
    type: DataType.STRING(100),
    allowNull: false,
  })
  transactionId: string;

  @Column({
    field: 'payment_date',
    type: DataType.DATE,
    allowNull: true,
  })
  paymentDate: Date;
}
