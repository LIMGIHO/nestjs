import { ApiProperty } from '@nestjs/swagger';

export class JoinRequestDto {
  @ApiProperty({
    example: 'stephen@kwe.com',
    description: '이메일',
    required: true,
  })
  public email: string;

  @ApiProperty({
    example: 'stephen.lim',
    description: '임기호',
    required: true,
  })
  public nickname: string;
  public password: string;
}
