import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: 'k3kybm49',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2023-05-03',
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
    return builder.image(source);
}
