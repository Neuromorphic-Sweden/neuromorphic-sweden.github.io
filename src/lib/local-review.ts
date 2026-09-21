import type { DiscoveryEntry } from './discovery';
import { sortDiscoveries } from './discovery';

export const localReviewEnabled = import.meta.env.DEV && process.env.LOCAL_REVIEW === 'true';
export type LocalReviewEntry = DiscoveryEntry & { reviewStatus: 'candidate' | 'approved' };

export async function getLocalReviewQueue(): Promise<{
	entries: LocalReviewEntry[]; token: string; error?: string;
}> {
	if (!localReviewEnabled) return { entries: [], token: '' };
	try {
		const response = await fetch(
			`${process.env.LOCAL_REVIEW_API_URL ?? 'http://127.0.0.1:8765'}/queue`,
			{ cache: 'no-store', signal: AbortSignal.timeout(5000) },
		);
		if (!response.ok) throw new Error(`Local API returned ${response.status}`);
		const payload = await response.json();
		const entries = payload.records.map((record: Record<string, any>) => {
			const { id, reviewStatus, ...data } = record;
			for (const key of ['discoveredAt', 'lastCheckedAt', 'sourcePublishedAt', 'eventStart', 'eventEnd']) {
				if (data[key]) data[key] = new Date(data[key]);
			}
			if (data.ai?.generatedAt) data.ai.generatedAt = new Date(data.ai.generatedAt);
			return { id, collection: 'discoveries', data, reviewStatus } as LocalReviewEntry;
		});
		return { entries: sortDiscoveries(entries) as LocalReviewEntry[], token: payload.token };
	} catch {
		return {
			entries: [], token: '',
			error: 'The local review service is unavailable. Start .local-discovery/.venv/bin/python .local-discovery/crawler_service.py review, then reload.',
		};
	}
}
