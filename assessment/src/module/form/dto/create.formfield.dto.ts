import { ApiProperty } from '@nestjs/swagger';

import { apiResponse } from '@app/module/form/constants/api.response.dto';
import { Column } from 'typeorm';
import { Form } from '../entities/form.entity';

export class CreateFormFieldDto {
  @ApiProperty(apiResponse.apiCreateFormTitleProperty)
  @Column()
  field_name: string;

  @Column()
  field_type: string;
}
