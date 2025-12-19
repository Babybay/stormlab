import { createClient } from 'next-sanity' // using sanity/client via npx sanity exec context usually works with 'sanity' or local config
// Actually, when running `sanity exec` it provides a client in the context, generally.
// But standard detailed script:

import { expertises } from './msg_data.js'
import { getCliClient } from 'sanity/cli'

const client = getCliClient()

async function migrate() {
    console.log('Starting migration...')

    for (const expertise of expertises) {
        console.log(`Processing Service: ${expertise.title}`)

        // 1. Create Projects for this service
        const projectRefs = []

        for (const project of expertise.projects) {
            const projectDoc = {
                _type: 'project',
                title: project.name,
                client: project.category, // Mapping category to client/category
                slug: { current: project.name.toLowerCase().replace(/\s+/g, '-').slice(0, 96) },
                // Images are hard, we'll skip uploading the placeholder image binary and just leave it empty 
                // or user can update it. For now let's just create the document.
            }

            // Check if exists to avoid dupes?
            // Simple create for now
            const createdProject = await client.create(projectDoc)
            console.log(`Created Project: ${createdProject.title}`)
            projectRefs.push({
                _type: 'reference',
                _ref: createdProject._id,
                _key: createdProject._id
            })
        }

        // 2. Create Service
        const serviceDoc = {
            _type: 'service',
            title: expertise.title,
            description: expertise.description,
            slug: { current: expertise.id },
            projects: projectRefs
        }

        const createdService = await client.create(serviceDoc)
        console.log(`Created Service: ${createdService.title}`)
    }

    // 3. Create Globals if not exists
    const globals = {
        _type: 'globals',
        _id: 'globals', // Singleton-ish
        email: 'stormlab.creative@gmail.com',
        socials: [
            { _key: '1', name: 'Instagram', url: 'https://instagram.com/stormlab.creative' },
            { _key: '2', name: 'Email', url: 'mailto:stormlab.creative@gmail.com' }
        ]
    }

    await client.createOrReplace(globals)
    console.log('Created Global Settings')

    console.log('Migration complete!')
}

migrate().catch(err => {
    console.error('Migration failed:', err)
    process.exit(1)
})
