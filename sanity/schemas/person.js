import { MdPerson as icon } from 'react-icons/md';

export default {
    // Computer name
    name: 'person',
    // Visible title
    title: 'Slicemasters',
    type: 'document',
    icon,
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string'
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'Tell us a bit about this person'
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 100
            }
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true
            }
        }
    ]
};
