import { RichText, useBlockProps } from '@wordpress/block-editor';

const SOCIAL_ICONS = {
	facebook: (
		<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
			<path
				fill="currentColor"
				d="M13 10h2.5l.5-3H13V5.5c0-.9.3-1.5 1.6-1.5H16V1.1C15.4 1 14.2 1 13 1c-2.7 0-4.5 1.6-4.5 4.5V7H6v3h2.5v9h4.5z"
			/>
		</svg>
	),
	whatsapp: (
		<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
			<path
				fill="currentColor"
				d="M17.5 14.4c-.3-.2-1.8-.9-2-.9s-.5-.2-.8.2-.9 1-1.1 1.2-.4.3-.8.1c-.4-.2-1.7-.6-3.2-2-1.2-1.1-2-2.5-2.3-3-.2-.4 0-.6.2-.8.2-.2.4-.4.5-.6.2-.2.2-.4.3-.6s0-.5 0-.7c0-.2-.8-1.8-1.1-2.4-.3-.6-.6-.5-.8-.5h-.7c-.2 0-.6.1-.9.4-.3.3-1.1 1-1.1 2.4s1.1 2.8 1.3 3c.2.2 2.3 3.5 5.6 4.9.8.3 1.5.5 2 .6.8.2 1.5.2 2.1.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.1-1.4-.1-.1-.3-.2-.6-.4z"
			/>
			<path
				fill="currentColor"
				d="M20.5 3.5C18.2 1.3 15.2 0 12 0 5.4 0 .1 5.2.1 11.6c0 2.1.6 4.1 1.7 5.9L0 24l6.7-1.7c1.7.9 3.7 1.4 5.6 1.4h.1c6.6 0 12-5.2 12-11.6 0-3.1-1.3-6-3.9-8.6zm-8.7 18c-1.8 0-3.5-.5-5-1.3l-.4-.2-4 .9.9-3.9-.2-.4c-1-1.6-1.5-3.3-1.5-5.1C1.6 6.5 6.2 2 12 2c2.9 0 5.5 1.1 7.5 3.1 2 1.9 3.1 4.5 3.1 7.3 0 5.6-4.9 10.1-10.8 10.1z"
			/>
		</svg>
	),
	instagram: (
		<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
			<path
				fill="currentColor"
				d="M7 2h10c2.8 0 5 2.2 5 5v10c0 2.8-2.2 5-5 5H7c-2.8 0-5-2.2-5-5V7c0-2.8 2.2-5 5-5m0-2C3.1 0 0 3.1 0 7v10c0 3.9 3.1 7 7 7h10c3.9 0 7-3.1 7-7V7c0-3.9-3.1-7-7-7z"
			/>
			<path
				fill="currentColor"
				d="M12 7a5 5 0 1 0 5 5 5 5 0 0 0-5-5m0-2a7 7 0 1 1-7 7 7 7 0 0 1 7-7Z"
			/>
			<circle cx="18.5" cy="5.5" r="1.5" fill="currentColor" />
		</svg>
	),
};

const backgroundLayers = ( url, textColor ) => ( {
	backgroundImage: url
		? `radial-gradient(circle at 20% 20%, rgba(255,255,255,0.16), transparent 45%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.12), transparent 40%), linear-gradient(130deg, rgba(90,43,240,0.95), rgba(241,138,25,0.9)), url(${ url })`
		: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.16), transparent 45%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.12), transparent 40%), linear-gradient(130deg, #6a2cf0, #f18a19)',
	color: textColor,
	backgroundSize: 'cover',
	backgroundPosition: 'center',
} );

const normalizeArray = ( value ) =>
	Array.isArray( value ) ? value.filter( Boolean ) : [];

const socialIconFor = ( label ) =>
	SOCIAL_ICONS[ ( label || '' ).toLowerCase() ];

export default function save( { attributes } ) {
	const {
		backgroundUrl,
		backgroundAlt,
		eyebrow,
		badge,
		title,
		subtitle,
		textColor,
		primaryCtaLabel,
		primaryCtaUrl,
		cardTitle,
		cardHighlights,
		cardDescription,
		aboutTitle,
		aboutText,
		socials,
		secondaryCtaLabel,
		secondaryCtaUrl,
	} = attributes;

	const highlights = normalizeArray( cardHighlights );
	const socialLinks = normalizeArray( socials );

	const blockProps = useBlockProps.save( {
		className: 'berger-header',
		style: backgroundLayers( backgroundUrl, textColor ),
		'aria-label': backgroundAlt || title || undefined,
	} );

	return (
		<section { ...blockProps }>
			<div className="berger-header__grid">
				<div className="berger-header__left">
					<div className="berger-header__badges">
						{ eyebrow && (
							<RichText.Content
								tagName="span"
								className="berger-header__eyebrow"
								value={ eyebrow }
							/>
						) }
						{ badge && (
							<RichText.Content
								tagName="span"
								className="berger-header__badge"
								value={ badge }
							/>
						) }
					</div>
					{ title && (
						<RichText.Content
							tagName="h1"
							className="berger-header__title"
							value={ title }
						/>
					) }
					{ subtitle && (
						<RichText.Content
							tagName="p"
							className="berger-header__subtitle"
							value={ subtitle }
						/>
					) }
					{ primaryCtaLabel && (
						<div className="berger-header__actions">
							<a
								className="berger-header__primary-cta"
								href={ primaryCtaUrl || '#' }
							>
								<span className="berger-header__cta-label">
									{ primaryCtaLabel }
								</span>
							</a>
						</div>
					) }
				</div>

				<div className="berger-header__card">
					{ cardTitle && (
						<RichText.Content
							tagName="h3"
							className="berger-header__card-title"
							value={ cardTitle }
						/>
					) }

					{ highlights.length > 0 && (
						<ul className="berger-header__list">
							{ highlights.map( ( item, index ) => (
								<li key={ `item-${ index }` }>
									<span
										className="berger-header__list-bullet"
										aria-hidden="true"
									/>
									<RichText.Content
										tagName="span"
										className="berger-header__list-text"
										value={ item }
									/>
								</li>
							) ) }
						</ul>
					) }

					{ cardDescription && (
						<RichText.Content
							tagName="p"
							className="berger-header__card-description"
							value={ cardDescription }
						/>
					) }

					{ ( aboutTitle || aboutText ) && (
						<div className="berger-header__about">
							{ aboutTitle && (
								<RichText.Content
									tagName="h4"
									className="berger-header__about-title"
									value={ aboutTitle }
								/>
							) }
							{ aboutText && (
								<RichText.Content
									tagName="p"
									className="berger-header__about-text"
									value={ aboutText }
								/>
							) }
						</div>
					) }

					<div className="berger-header__card-footer">
						{ socialLinks.length > 0 && (
							<div className="berger-header__socials">
								<span className="berger-header__social-label">
									Follow us
								</span>
								<div className="berger-header__social-icons">
									{ socialLinks.map( ( social, index ) => {
										const icon = socialIconFor(
											social.label
										);
										const label =
											social.label || 'Social link';
										return (
											<a
												key={ `social-${ index }` }
												className="berger-header__social-icon"
												href={ social.url || '#' }
												aria-label={ label }
											>
												{ icon ? (
													icon
												) : (
													<span
														className="berger-header__social-letter"
														aria-hidden="true"
													>
														{ label
															.trim()
															.charAt( 0 )
															.toUpperCase() }
													</span>
												) }
											</a>
										);
									} ) }
								</div>
							</div>
						) }
						{ secondaryCtaLabel && (
							<a
								className="berger-header__secondary-cta"
								href={ secondaryCtaUrl || '#' }
							>
								<span className="berger-header__cta-label">
									{ secondaryCtaLabel }
								</span>
								<span
									className="berger-header__cta-chevron"
									aria-hidden="true"
								>
									→
								</span>
							</a>
						) }
					</div>
				</div>
			</div>
		</section>
	);
}
