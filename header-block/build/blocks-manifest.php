<?php
// This file is generated. Do not modify it manually.
return array(
	'header-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'berger/header-block',
		'version' => '0.1.0',
		'title' => 'Header',
		'category' => 'design',
		'icon' => 'align-wide',
		'description' => 'En-tête personnalisable avec image, textes et appels à l\'action.',
		'keywords' => array(
			'hero',
			'cover',
			'cta'
		),
		'attributes' => array(
			'backgroundUrl' => array(
				'type' => 'string',
				'default' => ''
			),
			'backgroundAlt' => array(
				'type' => 'string',
				'default' => ''
			),
			'backgroundId' => array(
				'type' => 'number',
				'default' => 0
			),
			'title' => array(
				'type' => 'string',
				'default' => 'Titre accrocheur'
			),
			'subtitle' => array(
				'type' => 'string',
				'default' => 'Sous-titre descriptif pour contextualiser votre offre.'
			),
			'textColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'overlayColor' => array(
				'type' => 'string',
				'default' => '#000000'
			),
			'overlayOpacity' => array(
				'type' => 'number',
				'default' => 0.45
			),
			'alignment' => array(
				'type' => 'string',
				'default' => 'center'
			),
			'ctas' => array(
				'type' => 'array',
				'default' => array(
					array(
						'label' => 'En savoir plus',
						'url' => '#',
						'icon' => 'arrow-right-alt2',
						'variant' => 'primary'
					)
				)
			)
		),
		'supports' => array(
			'html' => false,
			'align' => array(
				'wide',
				'full'
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true
			)
		),
		'textdomain' => 'header-block',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	)
);
