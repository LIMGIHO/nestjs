import { ApiProperty, PickType } from '@nestjs/swagger';
import { Users } from 'src/entities/Users';

export class JoinRequestDto extends PickType(Users, ['email', 'nickname', 'password'] as const) {
  
}
