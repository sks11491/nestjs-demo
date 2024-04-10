import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Form } from './form.entity';

@Entity()
export class FormField {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  form_id: string;

  @Column()
  field_name: string;

  @Column()
  field_type: string;

  //@ManyToOne(() => Form, (form) => form.form_fields)
  //form: Form;

  @CreateDateColumn()
   created_at: Date;

  @UpdateDateColumn() 
   updated_at: Date;
}