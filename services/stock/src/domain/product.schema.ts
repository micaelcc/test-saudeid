import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'products' })
export class Product {
  @Prop({ required: true, _id: true })
  productId: string;

  @Prop({ required: true })
  availableItems: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
