export const previewBase = '/preview';

export const reportUrl =
	'https://diva-portal.org/smash/get/diva2%3A2008442/FULLTEXT01.pdf';

export const contactEmail = 'Sabine.Mayer@ltu.se';

export const navigation = [
	{ href: `${previewBase}/`, label: 'Home' },
	{ href: `${previewBase}/technology/`, label: 'Technology' },
	{ href: `${previewBase}/focus-areas/`, label: 'Focus areas' },
	{ href: `${previewBase}/ecosystem/`, label: 'Ecosystem' },
	{ href: `${previewBase}/activities/`, label: 'Activities' },
	{ href: `${previewBase}/resources/`, label: 'Resources' },
	{ href: `${previewBase}/about/`, label: 'About' },
];

export const focusAreas = [
	{
		title: 'Telecom and distributed infrastructure',
		description:
			'Adaptive, energy-efficient user equipment, radio access networks, signal processing and integrated sensing and communication.',
	},
	{
		title: 'Robotics and vehicles',
		description:
			'Low-power local perception, sensor fusion and responsive autonomy without continuous dependence on cloud infrastructure.',
	},
	{
		title: 'Extreme and inaccessible environments',
		description:
			'Persistent sensing and autonomous operation in space, subsea, industrial, environmental and critical-infrastructure settings.',
	},
	{
		title: 'Healthcare and biointegrated systems',
		description:
			'Wearable and implantable sensing, continuous monitoring, prosthetics and interfaces built from biocompatible materials.',
	},
	{
		title: 'The perceptual layer of AI',
		description:
			'Multimodal sensors and near-sensor intelligence that interpret real-world events before higher-level reasoning.',
	},
];
