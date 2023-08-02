import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
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
		heroImageAlt: z.string().optional(),
		projects: z.array(z.string()).optional(),
	}),
});

const projects = defineCollection({
	schema: ({ image }) => z.object({
		title: z.string(),
		headline: z.string(),
		screenshot: z.optional(image()),
		screenshotAlt: z.string().optional(),
		link: z.string().optional(),
		state: z.enum(['archived', 'active', 'complete']),
		feature: z.boolean().optional(),
		startDate: z.string().or(z.date()).transform((val) => new Date(val)),
		endDate: z.string().or(z.date()).transform((val) => new Date(val)).optional(),
		priority: z.number().optional(),
	}),
});


export const collections = { blog, projects };
