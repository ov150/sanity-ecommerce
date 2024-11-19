import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({
    name:"product",
    title:"Product",
    type:"document",
    icon:TrolleyIcon,
    fields:[
        defineField({
            name:"name",
            title:"Product Name",
            type:"string",
            validation:(Rule) => Rule.required(),
        }),
        defineField({
            name:"slug",
            title:"Slug",
            type:"slug",
            options:{
                source:"name",
                maxLength:96,
            },
            validation:(Rule) => Rule.required(),
        }),
        defineField({
            name:"image",
            title:"Product Image",
            type:"image",
            options:{
                hotspot:true
            },
            // validation:(Rule) => Rule.required(),
        }),
        defineField({
            name:"description",
            title:"Product Description",
            type:"text",
            // validation:(Rule) => Rule.required(),
        }),
        defineField({
            name:"price",
            title:"Product Price",
            type:"number",
            validation:(Rule) => Rule.required().min(0),
        }),
        defineField({
            name:"categories",
            title:"Product Categories",
            type:"array",
            of:[{ type : "reference", to: { type : "category"}}],
            // validation:(Rule) => Rule.required(),
        }),
        defineField({
            name:"stock",
            title:"Product Stock",
            type:"number",
            validation:(Rule) => Rule.min(0),
        }),
    ],
    preview:{
        select:{
            title:"name",
            media:"image",
            price:"price"
        },
        prepare(select){
            return {
                title: select.title,
                subtitle: `$${select.price}`,
                media: select.media
            }
        }
    }
})