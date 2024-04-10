import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Form } from './form.entity';
import { FormField } from './formfield.entity';

@Entity()
export class FormFillData {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  form_entry_id: number;

  @Column()
  form_field_id: number;

  @Column()
  value: string;
  /*@ManyToOne(() => Form, (form) => form.form_data)
  form: Form;

  @ManyToOne(() => FormField, (formField) => formField.form_fields)
  formField: Form;*/


  @CreateDateColumn()
   created_at: Date;

  @UpdateDateColumn() 
   updated_at: Date;
}
