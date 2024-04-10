import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { apiResponse } from '@app/module/form/constants/api.response.dto';
import { FormService } from '@app/module/form/services/form.service';

@ApiTags('Form')
@Controller('fill_data')
export class FilldataController {
  constructor(private readonly formService: FormService) {}

  @Get()
  @ApiParam({
    name: 'form_title',
    required: true
  })
  async getFillFormData(@Query('form_title') form_title) {     
      let formData = [];
      formData = await this.formService.getFormData(form_title);
      return formData;
  }

  @Post()
  @ApiParam({
    name: 'form_title',
    required: true
  })
  async saveFillFormData(@Query('form_title') form_title, @Body() body: any) {
      let filldataResponse = await this.formService.fillFormData(form_title, body);
      return filldataResponse;
  }
  
}
