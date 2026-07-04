import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '@prisma/client';
import { AuthResponse } from './types/auth-response.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  public async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const { email, password, firstName, lastName } = registerDto;

    const existingUser: User | null = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const passwordHash: string = await bcrypt.hash(registerDto.password, 10);

    const user: User = await this.prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName,
        lastName,
      },
    });

    const payload: Record<string, string> = {
      sub: user.id,
      email: user.email,
    };

    const accessToken: string = await this.jwtService.signAsync(payload);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName || undefined,
        lastName: user.lastName || undefined,
        role: user.role,
        createdAt: user.createdAt,
      },
      accessToken,
    };
  }

  public async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { email, password } = loginDto;

    const user: User | null = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordHash: string = user.passwordHash;

    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: Record<string, string> = {
      sub: user.id,
      email: user.email,
    };

    const accessToken: string = await this.jwtService.signAsync(payload);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName || undefined,
        lastName: user.lastName || undefined,
        role: user.role,
        createdAt: user.createdAt,
      },
      accessToken,
    };
  }
}
