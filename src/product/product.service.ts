import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { FileService } from 'src/file/file.service';
import { successRes } from 'src/utils/success-response';
import { catchError } from 'src/utils/catch-error';
import { ProductRaiting } from 'src/product_raitings/models/product_raiting.model';


@Injectable()
export class ProductService {
  constructor(@InjectModel(Product) private model: typeof Product,
  private readonly fileservice:FileService
){}

  async create(createProductDto: CreateProductDto, file?: Express.Multer.File) {
    try {
      console.log(file);
      
      const {name, seller_id} = createProductDto
      const existsProductName = await this.model.findOne({where:{name, seller_id}})
      if(existsProductName){
        throw new ConflictException(`Dublicate product name: ${name}`)
      }

      let image: undefined | string
      console.log(file);
      

      if (file) {
        image = await this.fileservice.createFile(file);
        console.log(image);
      }
      
      const product = await this.model.create({ ...createProductDto, image });

      return successRes(product, 201)

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    const product = await this.model.findAll({ include: [ProductRaiting] });
    return {
      StatusCode: 200,
      message: 'success',
      data: product,
    };
  }

  async findOne(id: number) {
    const product = await this.model.findByPk(id, { include: [ProductRaiting] });
    if (!product) {
      return `product not found by id ${id}`;
    }
    return {
      StatusCode: 200,
      message: 'success',
      data: product,
    };
  }

 async  update(
  id: number, 
  updateProductDto: UpdateProductDto,     
  file?: Express.Multer.File,
) {
     try {
      const product = await this.model.findByPk(id);
      if(!product){
        throw new ConflictException(`product not found by id ${id}`)
      }
      let image = product?.image;
      if (file) {
        if (image && (await this.fileservice.existFile(image))) {
          await this.fileservice.deleteFile(image);
        }
        image = await this.fileservice.createFile(file);
      }
      const updatedproduct = await this.model.update(
        {
          ...updateProductDto,
          image,
        },
        { where: { id }, returning: true },
      );
      return successRes(updatedproduct[1][0]);
    } catch (error) {
      return catchError(error);
    }
  }

  async remove(id: number) {
    const product = await this.model.destroy({ where: { id } });
    if (!product) {
      return `product not found by id ${id}`;
    }
    return {
      StatusCode: 201,
      message: 'succes',
      data: {},
    };
  }
}
