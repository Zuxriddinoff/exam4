import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../common/models/user.model";
import {SignInUserDto} from "../common/dto/signin-admin.dto"
import { decrypt } from "src/utils/bcrypt-decrypt";
import { catchError } from "src/utils/catch-error";
import { Token } from "src/utils/generate-token";
import { writeToCookie } from "src/utils/write-cookiie";
import { Response } from "express";
import { generateOtp } from "src/utils/generate-otp";
import { MailService } from "src/mail/mail.service";

@Injectable()
export class SignInUser {
    constructor(@InjectModel(User) private model: typeof User,
    private readonly token:Token,
    private readonly mailService: MailService
    ) { }

    async signInUser(signInAdminDto:SignInUserDto):Promise<object>{
        try {
            console.log('salom');
            
            const {email, password} = signInAdminDto
        
            const admin =await this.model.findOne({where:{email}})
            if(!admin){
                throw new BadRequestException('emial or password incorrect')
            }
            const ISMatchPassword = await decrypt(password, admin?.dataValues?.hashedPassword);
            if(!ISMatchPassword){
                throw new BadRequestException('emial or password incorrect')
            }
            
            const otp = generateOtp()
            console.log(otp);
            await this.mailService.sendOtp('zuxriddinovoff@gmail.com', otp)
            return {
                statusCode:200,
                message: 'success',
                data: otp
            }
        } catch (error) {
            return catchError(error)
        }
    }
}