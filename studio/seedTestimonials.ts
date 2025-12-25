import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const testimonials = [
    {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        author: "Lorem Ipsum",
        role: "Dolor Sit Amet",
        theme: "pink"
    },
    {
        text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        author: "Consectetur Adipiscing",
        role: "Elit Sed",
        theme: "green"
    },
    {
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        author: "Tempor Incididunt",
        role: "Labore Et Dolore",
        theme: "blue"
    }
]

async function seed() {
    console.log('Seeding testimonials...')
    for (const testimonial of testimonials) {
        await client.create({
            _type: 'testimonial',
            ...testimonial
        })
        console.log(`Created testimonial by ${testimonial.author}`)
    }
    console.log('Done!')
}

seed().catch(console.error)
