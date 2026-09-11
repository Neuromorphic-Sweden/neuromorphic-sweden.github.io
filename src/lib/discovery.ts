import type { CollectionEntry } from 'astro:content';

export type DiscoveryEntry = CollectionEntry<'discoveries'>;
export type DiscoveryRecordType = DiscoveryEntry['data']['recordType'];

export const discoveryTypeLabels: Record<DiscoveryRecordType, string> = {
	resource: 'Resource',
	organisation: 'Organisation',
	event: 'Event',
	hardware: 'Hardware',
	software: 'Software',
	'use-case': 'Use case',
};

export const githubRepositoryUrl =
	'https://github.com/neuromorphic-sweden/neuromorphic-sweden.github.io';

export const discoveryDate = (entry: DiscoveryEntry) =>
	entry.data.recordType === 'event' && entry.data.eventStart
		? entry.data.eventStart
		: entry.data.sourcePublishedAt ?? entry.data.discoveredAt;

export const sortDiscoveries = (entries: DiscoveryEntry[]) =>
	entries.sort((a, b) => discoveryDate(b).valueOf() - discoveryDate(a).valueOf());

export const formatDiscoveryDate = (date: Date) =>
	new Intl.DateTimeFormat('en-GB', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	}).format(date);

export const discoveryHref = (entry: DiscoveryEntry, review = false) =>
	`${review ? '/preview' : '/discovery'}/${entry.id}/`;

export const githubEditUrl = (entry: DiscoveryEntry) => {
	const branch = entry.data.review?.branch ?? 'main';
	const path =
		entry.data.review?.sourcePath ?? `src/content/discovery/${entry.id}.json`;
	return `${githubRepositoryUrl}/edit/${branch}/${path}`;
};

export const githubReviewUrl = (entry: DiscoveryEntry) =>
	entry.data.review?.pullRequestUrl ?? `${githubRepositoryUrl}/pulls`;
