import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { JwtUser } from 'src/auth/decorators/current-user.decorator';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from '@prisma/client';
import { UpdateCompanyDto } from './dto/update-company.dto';

@UseGuards(JwtAuthGuard)
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  public create(
    @CurrentUser() user: JwtUser,
    @Body() createCompanyDto: CreateCompanyDto,
  ): Promise<Company> {
    return this.companiesService.create(user.userId, createCompanyDto);
  }

  @Get()
  public findAll(@CurrentUser() user: JwtUser): Promise<Company[]> {
    return this.companiesService.findAll(user.userId);
  }

  @Get(':companyId')
  public findOne(
    @Param('companyId') companyId: string,
    @CurrentUser() user: JwtUser,
  ): Promise<Company> {
    return this.companiesService.findOne(companyId, user.userId);
  }

  @Patch(':companyId')
  public update(
    @Param('companyId') companyId: string,
    @CurrentUser() user: JwtUser,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    return this.companiesService.update(
      companyId,
      user.userId,
      updateCompanyDto,
    );
  }

  @Delete(':companyId')
  public remove(
    @Param('companyId') companyId: string,
    @CurrentUser() user: JwtUser,
  ): Promise<Company> {
    return this.companiesService.remove(companyId, user.userId);
  }
}
