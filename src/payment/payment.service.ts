import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './models/payment.model';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment) private readonly paymentModel: typeof Payment,
  ) { }

  async create(createPaymentDto: CreatePaymentDto) {
    try {
      return await this.paymentModel.create(createPaymentDto);
    } catch (error) {
      throw new InternalServerErrorException('Error creating payment');
    }
  }

  async findAll() {
    try {
      return await this.paymentModel.findAll(); // без include
    } catch (error) {
      throw new InternalServerErrorException('Error getting payments');
    }
  }

  async findOne(id: number) {
    try {
      const payment = await this.paymentModel.findByPk(id);
      if (!payment) {
        throw new NotFoundException(`Payment with id ${id} not found`);
      }
      return payment;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    try {
      const [updatedCount] = await this.paymentModel.update(updatePaymentDto, {
        where: { id },
      });

      if (updatedCount === 0) {
        throw new NotFoundException(`Payment with id ${id} not found or not changed`);
      }

      return await this.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const deletedCount = await this.paymentModel.destroy({
        where: { id },
      });

      if (deletedCount === 0) {
        throw new NotFoundException(`Payment with id ${id} not found`);
      }

      return { message: 'Payment deleted successfully' };
    } catch (error) {
      throw error;
    }
  }
}


