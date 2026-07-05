import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from '@prisma/client';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}

  public create(
    userId: string,
    createCompanyDto: CreateCompanyDto,
  ): Promise<Company> {
    return this.prisma.company.create({
      data: {
        userId,
        ...createCompanyDto,
      },
    });
  }

  public findAll(userId: string): Promise<Company[]> {
    return this.prisma.company.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  public async findOne(companyId: string, userId: string): Promise<Company> {
    const company: Company | null = await this.prisma.company.findFirst({
      where: {
        id: companyId,
        userId,
      },
    });

    if (company) {
      return company;
    }

    throw new NotFoundException('Company not found');
  }

  public async update(
    companyId: string,
    userId: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    const company: Company | null = await this.prisma.company.findFirst({
      where: {
        id: companyId,
        userId,
      },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return this.prisma.company.update({
      data: updateCompanyDto,
      where: {
        id: companyId,
      },
    });
  }

  public async remove(companyId: string, userId: string): Promise<Company> {
    const company: Company | null = await this.prisma.company.findFirst({
      where: {
        id: companyId,
        userId,
      },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return this.prisma.company.delete({
      where: {
        id: companyId,
      },
    });
  }
}
