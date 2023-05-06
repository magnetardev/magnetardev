import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z
			.string()
			.or(z.date())
			.transform((val) => new Date(val)),
		updatedDate: z
			.string()
			.optional()
			.transform((str) => (str ? new Date(str) : undefined)),
		heroImage: z.string().optional(),
		projects: z.array(z.string()).optional(),
	}),
});

const projects = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		headline: z.string(),
		link: z.string().optional(),
		state: z.enum(['archived', 'active', 'complete']),
		feature: z.boolean().optional(),
		priority: z.number().optional(),
	}),
});


export const collections = { blog, projects };
