export default {
    name: 'studioCapabilities',
    title: 'Studio Capabilities Images',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Document Title',
            type: 'string',
            description: 'A reference title (e.g., "Homepage Capabilities"). Only one document needs to be published.',
            validation: (Rule: any) => Rule.required(),
            initialValue: 'Homepage Capabilities'
        },
        {
            name: 'photographyImage',
            title: 'Photography Background Image',
            type: 'image',
            options: {
                hotspot: true, // Allows selecting the focal point
            },
        },
        {
            name: 'photographyVideo',
            title: 'Photography Background Video (Overrides image)',
            type: 'file',
            options: {
                accept: 'video/*'
            }
        },
        {
            name: 'videographyImage',
            title: 'Videography Background Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'videographyVideo',
            title: 'Videography Background Video (Overrides image)',
            type: 'file',
            options: {
                accept: 'video/*'
            }
        },
        {
            name: 'cinematographyImage',
            title: 'Cinematography Background Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'cinematographyVideo',
            title: 'Cinematography Background Video (Overrides image)',
            type: 'file',
            options: {
                accept: 'video/*'
            }
        },
        {
            name: 'eventMediaImage',
            title: 'Event Media Background Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'eventMediaVideo',
            title: 'Event Media Background Video (Overrides image)',
            type: 'file',
            options: {
                accept: 'video/*'
            }
        },
    ],
}
