export default {
    name: 'globals',
    title: 'Global Settings',
    type: 'document',
    fields: [
        {
            name: 'email',
            title: 'Contact Email',
            type: 'string',
        },
        {
            name: 'address',
            title: 'Address',
            type: 'text',
        },
        {
            name: 'socials',
            title: 'Social Links',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', type: 'string', title: 'Platform Name' },
                        { name: 'url', type: 'url', title: 'URL' },
                    ],
                },
            ],
        },
    ],
}
