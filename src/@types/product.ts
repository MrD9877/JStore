import z from "zod";

export const VariantSchema = z
  .object({
    color: z.string().min(1, "color is required"),
    size: z.string().min(1, "size is required"),
    stock: z.number().int(),
    sku: z.string().min(1, "sku is required"),
  })
  .strip();

export const ProductSchema = z
  .object({
    productId: z.string().min(1, "productId is required"),
    variants: z.array(VariantSchema).min(1, "at least one variant is required"),
    title: z.string().min(1, "title is required"),
    description: z.string().min(1, "description is required"),
    price: z.number().positive("price must be > 0"),
    images: z.array(z.string().min(1)).min(1, "at least one image"),
    category: z.string().min(1, "category is required"),
    date: z.number(), // accepts Date or date-like string
    priorityScore: z.number().min(0).max(100).optional(),
    discount: z.number().min(0).max(100).optional(),
    dimentions: z
      .object({
        length: z.number().positive("length must be > 0"),
        weight: z.number().int().positive("weight (grams) must be > 0"),
        height: z.number().positive("height must be > 0"),
        breadth: z.number().positive("breadth must be > 0"),
      })
      .strip(),
  })
  .strip();

export const ProductsSchema = z.array(ProductSchema);

export const AddProductSchema = ProductSchema.extend({
  variants: z.array(VariantSchema.partial({ sku: true })),
}).partial({
  productId: true,
  date: true,
  images: true,
});

export const ProductSchemaUpdate = ProductSchema.partial();

// If you want Zod to infer the exact TS type:
export type ProductType = z.infer<typeof ProductSchema>;

export const CartItemSchema = ProductSchema.omit({
  variants: true,
  description: true,
  priorityScore: true,
  images: true,
})
  .extend({
    variant: VariantSchema.extend({
      quantity: z.number().int().min(1, "quantity must be > 0"),
    }),
    image: z.string(),
  })
  .strip();

export const CartSchema = z.array(CartItemSchema);

export type CartItemsType = z.infer<typeof CartItemSchema>;
