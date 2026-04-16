import { RichText, useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';

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

export default function save( { attributes } ) {
	const {
		backgroundUrl,
		backgroundAlt,
		title,
		subtitle,
		textColor,
		overlayColor,
		overlayOpacity,
		alignment,
		ctas,
	} = attributes;

	const safeOpacity = Math.min( Math.max( overlayOpacity ?? 0.45, 0 ), 0.9 );
	const overlay = hexToRgba( overlayColor, safeOpacity );
	const backgroundStyle = backgroundUrl
		? {
				backgroundImage: `linear-gradient(${ overlay }, ${ overlay }), url(${ backgroundUrl })`,
		  }
		: {};

	const blockProps = useBlockProps.save( {
		className: classnames(
			'berger-header',
			`berger-header--${ alignment }`
		),
		style: {
			...backgroundStyle,
			color: textColor,
			backgroundColor: hexToRgba(
				overlayColor,
				Math.max( safeOpacity, 0.12 )
			),
		},
		'aria-label': backgroundAlt || title || undefined,
	} );

	const callToActions = ( ctas || [] ).filter(
		( cta ) => cta && ( cta.label || cta.icon )
	);

	return (
		<section { ...blockProps }>
			<div className="berger-header__content">
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

				{ callToActions.length > 0 && (
					<div className="berger-header__ctas">
						{ callToActions.map( ( cta, index ) => {
							const variant = cta.variant || 'primary';
							const isIconOnly = variant === 'icon';
							const label =
								cta.label || backgroundAlt || title || '';
							return (
								<a
									key={ `cta-${ index }` }
									className={ classnames(
										'berger-header__cta',
										`berger-header__cta--${ variant }`
									) }
									href={ cta.url || '#' }
									aria-label={
										isIconOnly ? label : undefined
									}
								>
									{ cta.icon && (
										<span
											className={ classnames(
												'berger-header__cta-icon',
												'dashicons',
												`dashicons-${ cta.icon }`
											) }
											aria-hidden="true"
										/>
									) }
									{ ! isIconOnly && cta.label && (
										<span className="berger-header__cta-label">
											{ cta.label }
										</span>
									) }
								</a>
							);
						} ) }
					</div>
				) }
			</div>
		</section>
	);
}
