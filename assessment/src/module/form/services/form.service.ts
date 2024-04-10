import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import { FormRepository } from '@app/module/form/repository/form.repository';

@Injectable()
export class FormService {
  constructor(
    private formRepository: FormRepository,
  ) {}
  
  async createForm(payload: any) {
    let formData = {title: payload.title}
    let formId = await this.formRepository.createForm(formData);
    if (!formId) {
      throw new NotFoundException('Form douldnt b inserted.');
    }
    for (let prop of Object.keys(payload)) {
      if (prop != 'title') {
        let formFieldItem = { field_name: prop, field_type: payload[prop], form_id: formId}
        this.formRepository.saveFormField(formFieldItem)
      }
    }

    return "success";

  }
  
  arrayFindObjectByProp = (arr, prop, val) => {
      return arr.find( obj => obj[prop] == val);
  };

  
  isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  parseTofieldType = (value, type) => {
    switch (type) {
      case 'boolean':
        return Boolean(Number(value))
      case 'number':
        return Number(value)
      default:
        return value
    }
  }

  async fillFormData(title: string, fillData: any) {
    let form = await this.formRepository.find(title);
    if (!form) {
      throw new NotFoundException('Form not found');
    }

    let formFields = await this.formRepository.findFields(form.id);
    
    let insertFlag = true;
    let formFieldItem = [];
    let errorMessages = [];
    let lastEntry = await this.formRepository.findLastFormEntryId();
    lastEntry++;
    for (let prop of Object.keys(fillData)) {
      if(!formFields.map(ele => ele.field_name).includes(prop)) {
        insertFlag=false
        break;
      }else {
        let fieldObj = this.arrayFindObjectByProp(formFields, 'field_name', prop);
        if (typeof fillData[prop] !== fieldObj.field_type) {
          if (fieldObj.field_type == 'email') {
            if (!this.isValidEmail(fillData[prop])) {
              errorMessages.push(prop)
              insertFlag=false
            }
          } else {
            errorMessages.push(prop)
            insertFlag=false
          }
        }
        
        formFieldItem.push({ form_entry_id: lastEntry, form_field_id: fieldObj.id, value: fillData[prop]});
      }
    }
    if(insertFlag) {
      this.formRepository.fillFormData(formFieldItem);
    } else {
      throw new HttpException(errorMessages.join(",") + " are invalid.", HttpStatus.BAD_REQUEST, {
        cause: new Error('Cause Error'),
       })
    }
    
    return "success";
  }


  async getFormData(title: string) {
    let form = await this.formRepository.find(title);
    if (!form) {
      throw new NotFoundException('Form not found');
    }
    
    let formFields = await this.formRepository.findFields(form.id);
    let fieldIdsToCatch = formFields.map(ele => ele.id)

    let formFieldItem = [];
    
    let formEntries = await this.formRepository.findFormEntries(fieldIdsToCatch);
    let entriesToWatch = formEntries.map(ele => ele.form_entry_id)
    for (let i = 0; i< entriesToWatch.length; i++) {
      let items = await this.formRepository.findFillFormDataBYEntryId(entriesToWatch[i]);
      let appendItem = [];
      for (let j = 0; j < items.length; j++) {
          let fieldObj = this.arrayFindObjectByProp(formFields, 'id', items[j].form_field_id);
          const fieldName = fieldObj.field_name
          let parsedvalue = this.parseTofieldType(items[j].value, fieldObj.field_type)
          appendItem[fieldName] = parsedvalue;
        }
      formFieldItem.push({entry: entriesToWatch[i], ...appendItem});
    }
     
    return formFieldItem;
  }
}


