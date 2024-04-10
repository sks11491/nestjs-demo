import { ApiProperty } from '@nestjs/swagger';

import { apiResponse } from '@app/module/form/constants/api.response.dto';
import { CreateFormFieldDto } from './create.formfield.dto';
import { Column } from 'typeorm';

export class CreateFormDto {
  @ApiProperty(apiResponse.apiCreateFormTitleProperty)
  @Column()
  title: string;
  
  @Column()
  field_name: string;

  @Column()
  field_type: string;
}
