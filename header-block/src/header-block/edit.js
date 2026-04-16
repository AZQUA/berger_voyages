import { __ } from '@wordpress/i18n';
import {
	ColorPalette,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	RichText,
	URLInputButton,
	useBlockProps,
} from '@wordpress/block-editor';
import { Button, Icon, PanelBody, TextControl } from '@wordpress/components';
import './editor.scss';

const palette = [
	'#ffffff',
	'#1f2933',
	'#111827',
	'#e11d48',
	'#2563eb',
	'#10b981',
	'#f59e0b',
	'#111',
];

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

const normalizeArray = ( value, fallback ) =>
	Array.isArray( value ) && value.length ? value : fallback;

const iconFor = ( label ) => SOCIAL_ICONS[ ( label || '' ).toLowerCase() ];

export default function Edit( { attributes, setAttributes } ) {
	const {
		backgroundUrl,
		backgroundAlt,
		backgroundId,
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

	const highlights = normalizeArray( cardHighlights, [
		__( 'Get great offers with exclusive travel deals', 'header-block' ),
	] );
	const socialLinks = normalizeArray( socials, [
		{ label: 'Facebook', url: '#' },
	] );

	const setBackground = ( media ) => {
		setAttributes( {
			backgroundUrl: media?.url || '',
			backgroundAlt: media?.alt || '',
			backgroundId: media?.id || 0,
		} );
	};

	const updateHighlight = ( index, value ) => {
		const next = [ ...highlights ];
		next[ index ] = value;
		setAttributes( { cardHighlights: next } );
	};

	const addHighlight = () =>
		setAttributes( {
			cardHighlights: [
				...highlights,
				__( 'Nouvelle idée', 'header-block' ),
			],
		} );

	const removeHighlight = ( index ) => {
		if ( highlights.length <= 1 ) {
			return;
		}
		setAttributes( {
			cardHighlights: highlights.filter( ( _, i ) => i !== index ),
		} );
	};

	const updateSocial = ( index, key, value ) => {
		const next = [ ...socialLinks ];
		next[ index ] = { ...next[ index ], [ key ]: value };
		setAttributes( { socials: next } );
	};

	const addSocial = () =>
		setAttributes( {
			socials: [
				...socialLinks,
				{ label: __( 'Nouveau réseau', 'header-block' ), url: '' },
			],
		} );

	const removeSocial = ( index ) => {
		if ( socialLinks.length <= 1 ) {
			return;
		}
		setAttributes( {
			socials: socialLinks.filter( ( _, i ) => i !== index ),
		} );
	};

	const blockProps = useBlockProps( {
		className: 'berger-header',
		style: backgroundLayers( backgroundUrl, textColor ),
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Image de fond', 'header-block' ) }
					initialOpen
				>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ setBackground }
							allowedTypes={ [ 'image' ] }
							value={ backgroundId }
							render={ ( { open } ) => (
								<Button variant="secondary" onClick={ open }>
									{ backgroundUrl
										? __(
												'Changer l’image',
												'header-block'
										  )
										: __(
												'Choisir une image',
												'header-block'
										  ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
					{ backgroundUrl && (
						<TextControl
							label={ __( 'Texte alternatif', 'header-block' ) }
							value={ backgroundAlt }
							onChange={ ( value ) =>
								setAttributes( { backgroundAlt: value } )
							}
						/>
					) }
					<div className="berger-header__control-group">
						<span className="components-base-control__label">
							{ __( 'Couleur du texte', 'header-block' ) }
						</span>
						<ColorPalette
							colors={ palette.map( ( color ) => ( { color } ) ) }
							value={ textColor }
							onChange={ ( color ) =>
								setAttributes( {
									textColor: color || '#ffffff',
								} )
							}
						/>
					</div>
				</PanelBody>

				<PanelBody
					title={ __( 'Contenu principal', 'header-block' ) }
					initialOpen={ false }
				>
					<TextControl
						label={ __( 'Accroche', 'header-block' ) }
						value={ eyebrow }
						onChange={ ( value ) =>
							setAttributes( { eyebrow: value } )
						}
					/>
					<TextControl
						label={ __( 'Badge (date ou info)', 'header-block' ) }
						value={ badge }
						onChange={ ( value ) =>
							setAttributes( { badge: value } )
						}
					/>
					<TextControl
						label={ __( 'CTA principal - lien', 'header-block' ) }
						value={ primaryCtaUrl }
						onChange={ ( value ) =>
							setAttributes( { primaryCtaUrl: value } )
						}
						placeholder="https://"
					/>
					<TextControl
						label={ __(
							'CTA principal - libellé',
							'header-block'
						) }
						value={ primaryCtaLabel }
						onChange={ ( value ) =>
							setAttributes( { primaryCtaLabel: value } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Carte de droite', 'header-block' ) }
					initialOpen={ false }
				>
					<TextControl
						label={ __( 'Titre de la carte', 'header-block' ) }
						value={ cardTitle }
						onChange={ ( value ) =>
							setAttributes( { cardTitle: value } )
						}
					/>
					{ highlights.map( ( item, index ) => (
						<div
							className="berger-header__cta-settings"
							key={ `highlight-${ index }` }
						>
							<TextControl
								label={ __( 'Point clé', 'header-block' ) }
								value={ item }
								onChange={ ( value ) =>
									updateHighlight( index, value )
								}
							/>
							<Button
								variant="link"
								onClick={ () => removeHighlight( index ) }
								disabled={ highlights.length <= 1 }
							>
								{ __( 'Supprimer', 'header-block' ) }
							</Button>
						</div>
					) ) }
					<Button variant="secondary" onClick={ addHighlight }>
						{ __( 'Ajouter un point', 'header-block' ) }
					</Button>
					<TextControl
						label={ __( 'Description', 'header-block' ) }
						value={ cardDescription }
						onChange={ ( value ) =>
							setAttributes( { cardDescription: value } )
						}
					/>
					<TextControl
						label={ __( 'Titre section À propos', 'header-block' ) }
						value={ aboutTitle }
						onChange={ ( value ) =>
							setAttributes( { aboutTitle: value } )
						}
					/>
					<TextControl
						label={ __( 'Texte À propos', 'header-block' ) }
						value={ aboutText }
						onChange={ ( value ) =>
							setAttributes( { aboutText: value } )
						}
					/>
					<TextControl
						label={ __(
							'CTA secondaire - libellé',
							'header-block'
						) }
						value={ secondaryCtaLabel }
						onChange={ ( value ) =>
							setAttributes( { secondaryCtaLabel: value } )
						}
					/>
					<TextControl
						label={ __( 'CTA secondaire - lien', 'header-block' ) }
						value={ secondaryCtaUrl }
						onChange={ ( value ) =>
							setAttributes( { secondaryCtaUrl: value } )
						}
						placeholder="https://"
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Réseaux sociaux', 'header-block' ) }
					initialOpen={ false }
				>
					{ socialLinks.map( ( social, index ) => (
						<div
							key={ `social-${ index }` }
							className="berger-header__cta-settings"
						>
							<TextControl
								label={ __( 'Nom', 'header-block' ) }
								value={ social.label }
								onChange={ ( value ) =>
									updateSocial( index, 'label', value )
								}
							/>
							<TextControl
								label={ __( 'Lien', 'header-block' ) }
								value={ social.url }
								onChange={ ( value ) =>
									updateSocial( index, 'url', value )
								}
								placeholder="https://"
							/>
							<Button
								variant="link"
								onClick={ () => removeSocial( index ) }
								disabled={ socialLinks.length <= 1 }
							>
								{ __( 'Supprimer', 'header-block' ) }
							</Button>
						</div>
					) ) }
					<Button variant="secondary" onClick={ addSocial }>
						{ __( 'Ajouter un réseau', 'header-block' ) }
					</Button>
				</PanelBody>
			</InspectorControls>

			<section { ...blockProps }>
				<div className="berger-header__grid">
					<div className="berger-header__left">
						<div className="berger-header__badges">
							<RichText
								tagName="span"
								className="berger-header__eyebrow"
								placeholder={ __(
									'Accroche courte',
									'header-block'
								) }
								value={ eyebrow }
								onChange={ ( value ) =>
									setAttributes( { eyebrow: value } )
								}
								allowedFormats={ [
									'core/bold',
									'core/italic',
									'core/underline',
								] }
							/>
							<RichText
								tagName="span"
								className="berger-header__badge"
								placeholder={ __(
									'Date ou info',
									'header-block'
								) }
								value={ badge }
								onChange={ ( value ) =>
									setAttributes( { badge: value } )
								}
								allowedFormats={ [ 'core/bold' ] }
							/>
						</div>
						<RichText
							tagName="h1"
							className="berger-header__title"
							placeholder={ __(
								'Saisissez un titre',
								'header-block'
							) }
							value={ title }
							onChange={ ( value ) =>
								setAttributes( { title: value } )
							}
							allowedFormats={ [
								'core/bold',
								'core/italic',
								'core/underline',
							] }
						/>
						<RichText
							tagName="p"
							className="berger-header__subtitle"
							placeholder={ __(
								'Ajoutez un sous-titre',
								'header-block'
							) }
							value={ subtitle }
							onChange={ ( value ) =>
								setAttributes( { subtitle: value } )
							}
							allowedFormats={ [
								'core/bold',
								'core/italic',
								'core/link',
								'core/underline',
							] }
						/>
						<div className="berger-header__actions">
							<div className="berger-header__primary-cta">
								<RichText
									tagName="span"
									className="berger-header__cta-label"
									placeholder={ __(
										'Texte du bouton',
										'header-block'
									) }
									value={ primaryCtaLabel }
									onChange={ ( value ) =>
										setAttributes( {
											primaryCtaLabel: value,
										} )
									}
								/>
								<URLInputButton
									url={ primaryCtaUrl }
									onChange={ ( url ) =>
										setAttributes( { primaryCtaUrl: url } )
									}
								/>
							</div>
						</div>
					</div>

					<div className="berger-header__card">
						<RichText
							tagName="h3"
							className="berger-header__card-title"
							placeholder={ __(
								'Titre de la carte',
								'header-block'
							) }
							value={ cardTitle }
							onChange={ ( value ) =>
								setAttributes( { cardTitle: value } )
							}
							allowedFormats={ [
								'core/bold',
								'core/italic',
								'core/underline',
							] }
						/>

						<ul className="berger-header__list">
							{ highlights.map( ( item, index ) => (
								<li key={ `item-${ index }` }>
									<span
										className="berger-header__list-bullet"
										aria-hidden="true"
									/>
									<RichText
										tagName="span"
										className="berger-header__list-text"
										placeholder={ __(
											'Ajouter un élément',
											'header-block'
										) }
										value={ item }
										onChange={ ( value ) =>
											updateHighlight( index, value )
										}
									/>
								</li>
							) ) }
						</ul>

						<RichText
							tagName="p"
							className="berger-header__card-description"
							placeholder={ __(
								'Description courte',
								'header-block'
							) }
							value={ cardDescription }
							onChange={ ( value ) =>
								setAttributes( { cardDescription: value } )
							}
							allowedFormats={ [ 'core/bold', 'core/italic' ] }
						/>

						<div className="berger-header__about">
							<RichText
								tagName="h4"
								className="berger-header__about-title"
								placeholder={ __( 'À propos', 'header-block' ) }
								value={ aboutTitle }
								onChange={ ( value ) =>
									setAttributes( { aboutTitle: value } )
								}
								allowedFormats={ [ 'core/bold' ] }
							/>
							<RichText
								tagName="p"
								className="berger-header__about-text"
								placeholder={ __(
									'Texte à propos',
									'header-block'
								) }
								value={ aboutText }
								onChange={ ( value ) =>
									setAttributes( { aboutText: value } )
								}
								allowedFormats={ [
									'core/bold',
									'core/italic',
								] }
							/>
						</div>

						<div className="berger-header__card-footer">
							<div className="berger-header__socials">
								<span className="berger-header__social-label">
									{ __( 'Follow us', 'header-block' ) }
								</span>
								<div className="berger-header__social-icons">
									{ socialLinks.map( ( social, index ) => {
										const icon = iconFor( social.label );
										return (
											<span
												key={ `social-icon-${ index }` }
												className="berger-header__social-icon"
												aria-label={
													social.label || undefined
												}
											>
												{ icon ? (
													<Icon icon={ icon } />
												) : (
													<span
														className="berger-header__social-letter"
														aria-hidden="true"
													>
														{ (
															social.label || '?'
														)
															.trim()
															.charAt( 0 )
															.toUpperCase() }
													</span>
												) }
											</span>
										);
									} ) }
								</div>
							</div>
							<div className="berger-header__secondary-cta">
								<RichText
									tagName="span"
									className="berger-header__cta-label"
									placeholder={ __(
										'Texte du bouton',
										'header-block'
									) }
									value={ secondaryCtaLabel }
									onChange={ ( value ) =>
										setAttributes( {
											secondaryCtaLabel: value,
										} )
									}
								/>
								<URLInputButton
									url={ secondaryCtaUrl }
									onChange={ ( url ) =>
										setAttributes( {
											secondaryCtaUrl: url,
										} )
									}
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
