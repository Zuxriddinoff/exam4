import { IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateProductRaitingDto {
    @IsNotEmpty()
    @IsNumber()
    rayting: number;
    
    @IsNotEmpty()
    @IsNumber()
    client_id: number;
    
    @IsNotEmpty()
    @IsNumber()
    product_id: number;
    
    @IsNotEmpty()
    @IsString()
    comment: string;
}
