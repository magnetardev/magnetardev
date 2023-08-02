export const SITE_TITLE = "Magnetar";
export const SITE_DESCRIPTION = "The personal site of Magnetar, a software developer and designer.";

export type SocialIcon = "github" | "email" | "twitter" | "mastodon"

type SocialAccount = {
	label: string;
	account: string;
	url: string;
	icon: SocialIcon;
}

export const SOCIAL_ACCOUNT_EMAIL: SocialAccount = {
	label: "Email",
	account: "contact@magnetar.dev",
	url: "mailto:contact@magnetar.dev",
	icon: "email",
} as const;

export const SOCIAL_ACCOUNT_GITHUB: SocialAccount = {
	label: "GitHub",
	account: "magnetardev",
	url: "https://github.com/magnetardev",
	icon: "github",
} as const;

export const SOCIAL_ACCOUNT_TWITTER: SocialAccount = {
	label: "Twitter",
	account: "magnetardev",
	url: "https://twitter.com/magnetardev",
	icon: "twitter",
} as const;

export const SOCIAL_ACCOUNT_MASTODON: SocialAccount = {
	label: "Mastodon",
	account: "@magnetardev@mstdn.social",
	url: "https://mstdn.social/@magnetar",
	icon: "mastodon",
} as const;

export const SOCIAL_LINKS: ReadonlyArray<SocialAccount> = [
	SOCIAL_ACCOUNT_EMAIL,
	SOCIAL_ACCOUNT_GITHUB,
	SOCIAL_ACCOUNT_TWITTER,
	SOCIAL_ACCOUNT_MASTODON,
];

