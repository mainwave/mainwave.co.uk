$(document).ready(function(){

	// ----- VARIABLES -----

    var $body = $('body');
    var $navPanel = $('#nav');
    var $contentSection = $('#content-section');
    var $contentSections = $contentSection.find('.section');
    var $backToTopLinks = $('.back-to-top');
    var $footer = $('#footer');
    var $permalinkTemplate = $('.template.permalink-container')
	    .detach()
	    .removeClass('template');

    // ----- FUNCTIONS -----

	function showSection(section)
	{
		var doShow = function()
		{
			$(section).slideDown(300, function()
			{
				$footer.removeClass('long');
			});
		};

		// If we haven't specified a section or the specified section doesn't exist,
		// default to the first one
		if (!section || $(section).length === 0)
		{
			section = $navPanel.find('a:first').attr('href');
		}
		else
		{
			// Prepend a hash if not already present
			section = section.replace(/^[^#]/, '#$&');
		}

		clearUrlHash();

		// Highlight the menu item
		$navPanel
			.find('a')
				.removeClass('current')
			.end()
			.find('a[href="' + section + '"]')
				.addClass('current')
			.end();

		$footer.addClass('long');

		var $visibleSection = $contentSections.filter(':visible');
		if ($visibleSection.length)
		{
			$visibleSection.slideUp('fast', doShow);
		}
		else
		{
			doShow();
		}
	}

	function clearUrlHash()
	{
		var newUrl = window.location.href.replace(window.location.hash, '');
		if (newUrl !== window.location.href && 'replaceState' in window.history)
		{
			window.history.replaceState(null, '', newUrl);
		}
	}


	// ----- EVENT HANDLERS -----

	// Intercept nav a clicks
	$('#nav a, a.local')
	.click(function(event)
	{
		showSection($(this).attr('href'), true);
		event.preventDefault();
	});

	// Galleries
	$('#book-reader-gallery').click(function()
	{
		$.slimbox([
			['/images/bookreader/01.png','Bookshelf view'],
			['/images/bookreader/02.png','Table of contents in portrait orientation'],
			['/images/bookreader/03.png','Search results view'],
			['/images/bookreader/04.png','Adding a bookmark'],
			['/images/bookreader/05.png','Bookmarks view'],
			['/images/bookreader/06.png','Sticky note shown in default "collapsed" mode'],
			['/images/bookreader/07.png','Sticky note shown in detail mode'],
			['/images/bookreader/08.png','Adding a weblink'],
			['/images/bookreader/09.png','Weblink shown in detail mode'],
			['/images/bookreader/10.png','Multi-colour highlights, both single-line and rectangle'],
			['/images/bookreader/11.png','Deleting a highlight']
		],
		0,
		{loop: false});
	});


	// ----- STARTUP PROCESSING -----

	$body
		.toggleClass('no-box-shadow', !Modernizr.boxshadow)
		.toggleClass('no-rgba', !Modernizr.rgba)
		.removeClass('no-js').addClass('js');
	$contentSections.hide();	// Hide all content sections
	$backToTopLinks.hide();     // Hide all "back to top" links

	// Insert section permalinks
	var urlBase = window.location.href
					.replace(window.location.hash, '')
					.replace(/^https?:\/\//, '')
					.replace(/^www./, '');

	$contentSections.find('h2:first-child').each(function()
	{
		var $h2 = $(this);
		var hash = '#' + $h2.parents('.section').attr('id');

		$permalinkTemplate
			.clone()
			.find('a')
				.attr('href', hash)
				.find('.section-name')
					.text($h2.text())
				.end()
				.find('.url')
					.text(urlBase + hash)
				.end()
			.end()
			.click(function(event){
				event.preventDefault();
			})
			.insertBefore($h2);
	});

	showSection(window.location.hash);

	var address =
		'hello' +
		String.fromCharCode(64) +
		'mainwave.' +
		'co.' +
		'uk';

	$('#email-address').html(
		'<a href="mailto:' + address + '">' + address + '</a>'
	);
});
