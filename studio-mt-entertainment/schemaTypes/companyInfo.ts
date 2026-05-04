export default {
  name: 'companyInfo',
  title: 'Company Info',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule: any) => Rule.required().email(),
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'Display format, e.g., "+61 422 080 939"',
    },
    {
      name: 'socials',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform Name',
              type: 'string',
              description: 'e.g., Instagram, Vimeo, YouTube',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule: any) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
}
