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
			'eyebrow' => array(
				'type' => 'string',
				'default' => 'It’s not how much time you spend in a place, but how much you give to it.'
			),
			'badge' => array(
				'type' => 'string',
				'default' => '25 Dec 2022'
			),
			'title' => array(
				'type' => 'string',
				'default' => 'Welcome! Let’s plan your dream trip!'
			),
			'subtitle' => array(
				'type' => 'string',
				'default' => 'Design the perfect adventure with us.'
			),
			'textColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'primaryCtaLabel' => array(
				'type' => 'string',
				'default' => 'Contact Us'
			),
			'primaryCtaUrl' => array(
				'type' => 'string',
				'default' => '#'
			),
			'cardTitle' => array(
				'type' => 'string',
				'default' => 'Let’s help you with a custom-made trip'
			),
			'cardHighlights' => array(
				'type' => 'array',
				'default' => array(
					'Get great offers with exclusive travel deals',
					'Trip consultation for your next destination'
				)
			),
			'cardDescription' => array(
				'type' => 'string',
				'default' => 'Tell us your ultimate goals and ask us anything in between your adventure routes.'
			),
			'aboutTitle' => array(
				'type' => 'string',
				'default' => 'About us'
			),
			'aboutText' => array(
				'type' => 'string',
				'default' => 'A travel agency with hard work'
			),
			'socials' => array(
				'type' => 'array',
				'default' => array(
					array(
						'label' => 'Facebook',
						'url' => '#'
					),
					array(
						'label' => 'WhatsApp',
						'url' => '#'
					),
					array(
						'label' => 'Instagram',
						'url' => '#'
					)
				)
			),
			'secondaryCtaLabel' => array(
				'type' => 'string',
				'default' => 'Start your journey'
			),
			'secondaryCtaUrl' => array(
				'type' => 'string',
				'default' => '#journey'
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
