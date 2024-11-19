import {DocumentTextIcon, TagIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const salesType = defineType({
  name: 'sales',
  title: 'Sales',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title:"Sale Title",
      type: 'string',
    }),
    defineField({
      name: 'description',
      title:"Sale Description",
      type: 'text',
    }),
    defineField({
      name: 'discountAmount',
      title:"Discount Amount",
      type: 'number',
      description:"Amount off in percentage or fixed value"
    }),
    defineField({
      name: 'couponCode',
      title:"Coupon Code",
      type: 'string'
    }),
    defineField({
      name: 'validForm',
      title:"Valid Form",
      type: 'datetime'
    }),
    defineField({
      name: 'validUntil',
      title:"Valid Until",
      type: 'datetime'
    }),
    defineField({
      name:"isActive",
      type:"boolean",
      title:"Is Active",
      description:"Toggle to activate/deactive the sale",
      initialValue:true,
    })
  ],
  preview: {
    select: {
      title: 'title',
      discountAmount: 'discountAmount',
      couponCode:"couponCode",
      isActive: 'isActive',
    },
    prepare(selection) {
      const {couponCode, discountAmount, isActive, title} = selection
      const status = isActive ? "Active" : "Inactive";
      return {
        title,
        subtitle:`${discountAmount}% off - Code: ${couponCode} - ${status}`,
      }
    },
  },
})
