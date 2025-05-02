import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../users/dto/register.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private jwtService: JwtService
  ) {}

  async register(dto: RegisterDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.userModel.create({
      username: dto.username,
      email: dto.email,
      password: hashed,
    });
    return this.signToken(user);
  }

  async login(dto: LoginUserDto) {
    const user = await this.userModel.findOne({ where: { email: dto.email } });
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.signToken(user);
  }

  private signToken(user: User) {
    const payload = { sub: user.id, username: user.username};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
