export default {
    name: 'testimonial',
    title: 'Testimonial',
    type: 'document',
    fields: [
        {
            name: 'text',
            title: 'Testimonial Text',
            type: 'text',
        },
        {
            name: 'author',
            title: 'Author Name',
            type: 'string',
        },
        {
            name: 'role',
            title: 'Role / Company',
            type: 'string',
        },
        {
            name: 'theme',
            title: 'Color Theme',
            type: 'string',
            options: {
                list: [
                    { title: 'Pink', value: 'pink' },
                    { title: 'Green', value: 'green' },
                    { title: 'Blue', value: 'blue' },
                    { title: 'Agency Gray (Default)', value: 'gray' }
                ],
                layout: 'radio'
            },
            initialValue: 'gray'
        }
    ]
}
