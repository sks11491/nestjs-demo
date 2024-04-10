import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { apiResponse } from '@app/module/form/constants/api.response.dto';
import { CreateFormDto } from '@app/module/form/dto/create.form.dto';
import { FillFormDto } from '@app/module/form/dto/fill.form.dto';
import { Form } from '@app/module/form/entities/form.entity';
import { FormService } from '@app/module/form/services/form.service';

@ApiTags('Form')
@Controller()
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post()
  @ApiCreatedResponse({ description: apiResponse.apiFormCreatedResponse })
  @ApiBody({ type: CreateFormDto })
  async saveForm(@Body() body: any): Promise<string> {
    const form: CreateFormDto = body;
    let formObj = await this.formService.createForm(body);
    return 'success';
  }
  
}
