import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString() username?: string;
  @IsString() email?: string;
  @IsString() full_name?: string;
  @IsString() role?: string;
  @IsString() hashed_password?: string;
}
