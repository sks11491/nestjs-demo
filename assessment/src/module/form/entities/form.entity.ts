import { IsEmail } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { FormField } from './formfield.entity';
import { FormFillData } from './formfilldata.entity';

@Entity()
export class Form {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  //@OneToMany(() => FormField, (formField) => formField.form)
  //@JoinColumn()
  //form_fields: FormField[];

  // @OneToMany(() => FormFillData, (formFillData) => formFillData.form)
  // @JoinColumn()
  // form_data: FormField[];

  @CreateDateColumn()
   created_at: Date;

  @UpdateDateColumn() 
   updated_at: Date;
}
