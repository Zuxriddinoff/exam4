import { Injectable, InternalServerErrorException, NotFoundException, BadRequestException, ConflictException, } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './models/orders.model';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order)
    private model: typeof Order,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const existing = await this.model.findOne({ where: { phone_number: createOrderDto.phone_number } });
      if (existing) {
        throw new ConflictException('Bu telefon raqam bilan buyurtma allaqachon mavjud.');
      }

      const order = await this.model.create({ ...createOrderDto });
      return order;
    } catch (error) {
      throw new BadRequestException(error.message || 'Buyurtmani yaratishda xatolik yuz berdi.');
    }
  }

  async findAll(): Promise<Order[]> {
    try {
      return await this.model.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Buyurtmalar royxatini olishda xatolik yuz berdi.');
    }
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.model.findByPk(id);
    if (!order) {
      throw new NotFoundException(`ID raqami ${id} bolgan buyurtma topilmadi.`);
    }
    return order;
  }

  async update(id: number, dto: UpdateOrderDto): Promise<Order> {
    const order = await this.model.findByPk(id);
    if (!order) {
      throw new NotFoundException(`ID raqami ${id} bolgan buyurtma mavjud emas.`);
    }

    try {
      await order.update(dto);
      return order;
    } catch (error) {
      throw new BadRequestException('Buyurtmani yangilashda xatolik yuz berdi.');
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    const order = await this.model.findByPk(id);
    if (!order) {
      throw new NotFoundException(`ID raqami ${id} bolgan buyurtma topilmadi.`);
    }

    try {
      await order.destroy();
      return { message: 'Buyurtma muvaffaqiyatli ochirildi.' };
    } catch (error) {
      throw new InternalServerErrorException('Buyurtmani ochirishda xatolik yuz berdi.');
    }
  }
}
