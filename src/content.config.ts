import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const discoveries = defineCollection({
	loader: glob({ pattern: '**/*.json', base: './src/content/discovery' }),
	schema: z.object({
		candidateId: z.string().min(8),
		title: z.string().min(3),
		recordType: z.enum(['resource', 'organisation', 'event', 'hardware', 'software', 'use-case']),
		summary: z.string().min(20),
		tldr: z.string().min(10),
		sourceUrl: z.string().url(),
		sourceName: z.string().optional(),
		internal: z.boolean().default(false),
		sourcePublishedAt: z.coerce.date().optional(),
		discoveredAt: z.coerce.date(),
		lastCheckedAt: z.coerce.date(),
		organisation: z.string().optional(),
		location: z.string().optional(),
		eventStart: z.coerce.date().optional(),
		eventEnd: z.coerce.date().optional(),
		country: z.string().optional(),
		tags: z.array(z.string()).default([]),
		useCases: z.array(z.string()).default([]),
		evidence: z.array(z.string()).default([]),
		trl: z
			.object({
				minimum: z.number().int().min(1).max(9).optional(),
				maximum: z.number().int().min(1).max(9).optional(),
				basis: z.enum(['source-claimed', 'ai-estimate', 'reviewed-assessment']),
				scope: z.string(),
				evidence: z.string(),
				confidence: z.enum(['low', 'medium', 'high']),
			})
			.optional(),
		ai: z.object({
			assisted: z.boolean(),
			model: z.string().optional(),
			generatedAt: z.coerce.date().optional(),
			promptVersion: z.string().optional(),
		}),
		review: z
			.object({
				branch: z.string().optional(),
				pullRequestUrl: z.string().url().optional(),
				sourcePath: z.string().optional(),
			})
			.optional(),
	}),
});

export const collections = { discoveries };
