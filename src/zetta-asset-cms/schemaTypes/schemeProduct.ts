import { defineField, defineType } from "sanity"

export const schemaProduct = defineType({
    name: "product",
    title: "Product",
    type: "document",
    fields: [
        // BASIC INFO
        defineField({
            name: "title",
            title: "Product Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "title" },
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "thumbnail",
            title: "Thumbnail",
            type: "image",
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "category",
            title: "Category",
            type: "string",
            options: {
                list: [
                    { title: "UI Kit", value: "ui-kit" },
                    { title: "Icon Set", value: "icon-set" },
                    { title: "Template", value: "template" },
                ],
                layout: "radio",
            },
        }),

        // PRICING
        defineField({
            name: "originalPrice",
            title: "Original Price",
            type: "number",
            description: "Price before discount",
            hidden: ({ document }) => document?.isFree === true,
            validation: (Rule) => Rule.min(0).warning("Price should not be negative or 0")
        }),

        defineField({
            name: "price",
            title: "Final Price",
            type: "number",
            description: "Price after discount",
            hidden: ({ document }) => document?.isFree === true,
            validation: (Rule) => Rule.min(0).warning("Price should not be negative or 0")
        }),

        defineField({
            name: "isDiscounted",
            title: "Is Discounted?",
            type: "boolean",
            initialValue: false,
        }),

        defineField({
            name: "isFree",
            title: "Free Product?",
            type: "boolean",
            initialValue: false,
        }),

        // CONTENT SECTIONS
        defineField({
            name: "intro",
            title: "Intro Description",
            description: "Short persuasive intro (shown near price)",
            type: "array",
            of: [{ type: "block" }],
        }),

        defineField({
            name: "whatYouGet",
            title: "What You Will Get",
            type: "array",
            of: [{ type: "block" }],
        }),

        defineField({
            name: "whyMustHave",
            title: "Why You Must Have This",
            type: "array",
            of: [{ type: "block" }],
        }),

        defineField({
            name: "bonus",
            title: "Bonus",
            type: "array",
            of: [{ type: "block" }],
        }),

        defineField({
            name: "howToOrder",
            title: "How To Order",
            type: "array",
            of: [{ type: "block" }],
        }),
    ],
})
