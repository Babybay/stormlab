export default {
    name: 'project',
    title: 'Project',
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
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'gallery',
            title: 'Gallery',
            type: 'array',
            of: [{ type: 'image' }],
        },
        {
            name: 'client',
            title: 'Client',
            type: 'string',
        },
        {
            name: 'year',
            title: 'Year',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        {
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
        },
    ],
}
