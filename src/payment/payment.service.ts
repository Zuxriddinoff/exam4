import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './models/payment.model';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { NotFoundException } from '@nestjs/common';
import { Order } from 'src/orders/models/orders.model';


@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment) private readonly paymentModel: typeof Payment,
  ) { }

  async create(createPaymentDto: CreatePaymentDto) {
    try {
      const payment = await this.paymentModel.create(createPaymentDto);
      return payment;
    } catch (error) {
      throw new Error('Erorr in to PAYMENT ' + error.message);
    }
  }
  async findAll() {
    try {
      return await this.paymentModel.findAll({include: [Order]});
    } catch (error) {
      throw new Error('Erorr gets PAYMENTS: ' + error.message);
    }
  }

  async findOne(id: number) {
    try {
      const payment = await this.paymentModel.findByPk(id, {include: [Order]});
      if (!payment) {
        throw new NotFoundException(`Payment with id ${id} not found`);
      }
      return payment;
    } catch (error) {
      throw new Error('Error to get PAYMENT: ' + error.message);
    }
  }


  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    try {
      const [updatedCount] = await this.paymentModel.update(updatePaymentDto, { where: { id } });
      if (updatedCount === 0) {
        throw new NotFoundException(`Payment with id ${id} not found or not changed`);
      }
      return await this.findOne(id);
    } catch (error) {
      throw new Error('Error in update PAYMENT: ' + error.message);
    }
  }


  async remove(id: number) {
    try {
      const deletedCount = await this.paymentModel.destroy({ where: { id } });
      if (deletedCount === 0) {
        throw new NotFoundException(`Payment with id ${id} not found`);
      }
      return { message: 'Payment deleted successfully' };
    } catch (error) {
      throw new Error('Error in delete PAYMENT: ' + error.message);
    }
  }

}
