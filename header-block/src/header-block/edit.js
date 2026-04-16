import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	RichText,
	URLInputButton,
	ColorPalette,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	BaseControl,
	Button,
	Icon,
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl,
} from '@wordpress/components';
import { plus } from '@wordpress/icons';
import classnames from 'classnames';
import './editor.scss';

const CTA_ICONS = [
	{ label: __( 'Aucune', 'header-block' ), value: '' },
	{ label: __( 'Flèche', 'header-block' ), value: 'arrow-right-alt2' },
	{ label: __( 'Étoile', 'header-block' ), value: 'star-filled' },
	{ label: __( 'Info', 'header-block' ), value: 'info' },
	{ label: __( 'Voir', 'header-block' ), value: 'visibility' },
	{ label: __( 'Télécharger', 'header-block' ), value: 'download' },
];

const CTA_VARIANTS = [
	{ label: __( 'Plein', 'header-block' ), value: 'primary' },
	{ label: __( 'Contour', 'header-block' ), value: 'ghost' },
	{ label: __( 'Icône seule', 'header-block' ), value: 'icon' },
];

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

const hexToRgba = ( hex = '#000000', alpha = 1 ) => {
	const sanitized = hex.replace( '#', '' );
	const pairs =
		sanitized.length === 3
			? sanitized.split( '' ).map( ( char ) => char + char )
			: sanitized.match( /.{1,2}/g );

	if ( ! pairs || pairs.length < 3 ) {
		return `rgba(0, 0, 0, ${ alpha })`;
	}

	const [ r, g, b ] = pairs.map( ( pair ) => parseInt( pair, 16 ) );
	return `rgba(${ r }, ${ g }, ${ b }, ${ alpha })`;
};

export default function Edit( { attributes, setAttributes } ) {
	const {
		backgroundUrl,
		backgroundAlt,
		backgroundId,
		title,
		subtitle,
		textColor,
		overlayColor,
		overlayOpacity,
		alignment,
		ctas,
	} = attributes;

	const setBackground = ( media ) => {
		setAttributes( {
			backgroundUrl: media?.url || '',
			backgroundAlt: media?.alt || '',
			backgroundId: media?.id || 0,
		} );
	};

	const updateCta = ( index, key, value ) => {
		const next = [ ...ctas ];
		next[ index ] = { ...next[ index ], [ key ]: value };
		setAttributes( { ctas: next } );
	};

	const addCta = () => {
		setAttributes( {
			ctas: [
				...ctas,
				{
					label: __( 'Nouveau CTA', 'header-block' ),
					url: '',
					icon: '',
					variant: 'primary',
				},
			],
		} );
	};

	const removeCta = ( index ) => {
		if ( ctas.length === 1 ) {
			return;
		}
		setAttributes( { ctas: ctas.filter( ( _, i ) => i !== index ) } );
	};

	const overlay = hexToRgba( overlayColor, overlayOpacity );
	const backgroundStyle = backgroundUrl
		? {
				backgroundImage: `linear-gradient(${ overlay }, ${ overlay }), url(${ backgroundUrl })`,
		  }
		: {
				backgroundColor: hexToRgba(
					overlayColor,
					Math.max( overlayOpacity, 0.1 )
				),
		  };

	const blockProps = useBlockProps( {
		className: classnames(
			'berger-header',
			`berger-header--${ alignment }`
		),
		style: {
			...backgroundStyle,
			color: textColor,
		},
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
				</PanelBody>

				<PanelBody
					title={ __( 'Overlay', 'header-block' ) }
					initialOpen
				>
					<BaseControl
						id="overlay-color-control"
						label={ __( 'Couleur', 'header-block' ) }
					>
						<ColorPalette
							colors={ palette.map( ( color ) => ( { color } ) ) }
							value={ overlayColor }
							onChange={ ( color ) =>
								setAttributes( {
									overlayColor: color || '#000000',
								} )
							}
						/>
					</BaseControl>
					<RangeControl
						label={ __( 'Opacité', 'header-block' ) }
						value={ overlayOpacity }
						onChange={ ( value ) =>
							setAttributes( {
								overlayOpacity: Number.isFinite( value )
									? value
									: 0.45,
							} )
						}
						min={ 0 }
						max={ 0.9 }
						step={ 0.05 }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Typographie et couleurs', 'header-block' ) }
					initialOpen={ false }
				>
					<BaseControl
						id="text-color-control"
						label={ __( 'Couleur du texte', 'header-block' ) }
					>
						<ColorPalette
							colors={ palette.map( ( color ) => ( { color } ) ) }
							value={ textColor }
							onChange={ ( color ) =>
								setAttributes( {
									textColor: color || '#ffffff',
								} )
							}
						/>
					</BaseControl>
					<SelectControl
						label={ __( 'Alignement du contenu', 'header-block' ) }
						value={ alignment }
						options={ [
							{
								label: __( 'Gauche', 'header-block' ),
								value: 'left',
							},
							{
								label: __( 'Centré', 'header-block' ),
								value: 'center',
							},
							{
								label: __( 'Droite', 'header-block' ),
								value: 'right',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { alignment: value } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Appels à l’action', 'header-block' ) }
					initialOpen={ false }
				>
					{ ctas.map( ( cta, index ) => (
						<div
							key={ `cta-${ index }` }
							className="berger-header__cta-settings"
						>
							<TextControl
								label={ __( 'Libellé', 'header-block' ) }
								value={ cta.label }
								onChange={ ( value ) =>
									updateCta( index, 'label', value )
								}
							/>
							<TextControl
								label={ __( 'Lien', 'header-block' ) }
								value={ cta.url }
								onChange={ ( value ) =>
									updateCta( index, 'url', value )
								}
								placeholder="https://"
							/>
							<SelectControl
								label={ __( 'Style', 'header-block' ) }
								value={ cta.variant || 'primary' }
								options={ CTA_VARIANTS }
								onChange={ ( value ) =>
									updateCta( index, 'variant', value )
								}
							/>
							<SelectControl
								label={ __( 'Icône', 'header-block' ) }
								value={ cta.icon || '' }
								options={ CTA_ICONS }
								onChange={ ( value ) =>
									updateCta( index, 'icon', value )
								}
							/>
							<Button
								variant="link"
								onClick={ () => removeCta( index ) }
								disabled={ ctas.length === 1 }
							>
								{ __( 'Supprimer', 'header-block' ) }
							</Button>
						</div>
					) ) }
					<Button
						icon={ plus }
						variant="secondary"
						onClick={ addCta }
					>
						{ __( 'Ajouter un CTA', 'header-block' ) }
					</Button>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="berger-header__inner">
					{ ! backgroundUrl && (
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ setBackground }
								allowedTypes={ [ 'image' ] }
								value={ backgroundId }
								render={ ( { open } ) => (
									<Button
										variant="secondary"
										onClick={ open }
									>
										{ __(
											'Ajouter une image de fond',
											'header-block'
										) }
									</Button>
								) }
							/>
						</MediaUploadCheck>
					) }

					<div className="berger-header__content">
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

						<div className="berger-header__ctas">
							{ ctas.map( ( cta, index ) => {
								const isIconOnly = cta.variant === 'icon';
								return (
									<div
										key={ `cta-display-${ index }` }
										className={ classnames(
											'berger-header__cta',
											`berger-header__cta--${
												cta.variant || 'primary'
											}`
										) }
									>
										{ cta.icon && (
											<Icon
												className="berger-header__cta-icon"
												icon={ `dashicons-${ cta.icon }` }
											/>
										) }
										{ ! isIconOnly && (
											<RichText
												tagName="span"
												className="berger-header__cta-label"
												placeholder={ __(
													'Texte du bouton',
													'header-block'
												) }
												value={ cta.label }
												onChange={ ( value ) =>
													updateCta(
														index,
														'label',
														value
													)
												}
											/>
										) }
										<URLInputButton
											url={ cta.url }
											onChange={ ( url ) =>
												updateCta( index, 'url', url )
											}
										/>
									</div>
								);
							} ) }
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
