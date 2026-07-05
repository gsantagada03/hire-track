import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @MaxLength(100)
  name!: string;

  @IsOptional()
  @IsUrl()
  website?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  industry?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  location?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;
}
