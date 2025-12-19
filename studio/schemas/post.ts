export default {
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        },
        {
            name: 'author',
            title: 'Author',
            type: 'string',
        },
        {
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{ type: 'string' }],
        },
        {
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
        },
        {
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [
                {
                    type: 'block',
                },
                {
                    type: 'image',
                    options: { hotspot: true },
                },
            ],
        },
    ],
}
