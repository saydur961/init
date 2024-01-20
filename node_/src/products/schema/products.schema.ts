import { Schema, model, Document, Model } from 'mongoose';

export interface ty_ProductSchema extends Document {
  name: string;
  price: number;
  image: string;
};

const productSchema = new Schema<ty_ProductSchema>({

  name: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true,
    min: 1
  },
  image: {
    type: String,
    required: true
  },

});

export const ProductSchema: Model<ty_ProductSchema> = 
model<ty_ProductSchema>('Product', productSchema);

// index for sorting purpose
productSchema.index({
  price: 1
});