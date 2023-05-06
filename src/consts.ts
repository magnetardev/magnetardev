export const SITE_TITLE = 'Magnetar';
export const SITE_DESCRIPTION = 'Foobar';

type SocialAccount = {
	label: string;
	account: string;
	url: string;
}

export const SOCIAL_ACCOUNT_EMAIL: SocialAccount = {
	label: "Email",
	account: "contact@magnetar.dev",
	url: "mailto:contact@magnetar.dev",
} as const;

export const SOCIAL_ACCOUNT_GITHUB: SocialAccount = {
	label: "GitHub",
	account: "magnetardev",
	url: "https://github.com/magnetardev",
} as const;

export const SOCIAL_ACCOUNT_TWITTER: SocialAccount = {
	label: "Twitter",
	account: "magnetardev",
	url: "https://twitter.com/magnetardev",
} as const;

export const SOCIAL_ACCOUNT_MASTODON: SocialAccount = {
	label: "Mastodon",
	account: "@magnetardev@mstdn.social",
	url: "https://mstdn.social/@magnetar",
} as const;

export const SOCIAL_LINKS: ReadonlyArray<SocialAccount> = [
	SOCIAL_ACCOUNT_EMAIL,
	SOCIAL_ACCOUNT_GITHUB,
	SOCIAL_ACCOUNT_TWITTER,
	SOCIAL_ACCOUNT_MASTODON,
];

