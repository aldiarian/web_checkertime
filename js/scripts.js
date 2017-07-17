jQuery(document).ready(function($) {
	var btnMenu = $('#btn-menu');
	var menuMovil = $('#menu-movil');
	btnMenu.on('click', function() {
			btnMenu.toggleClass('cerrar');
			menuMovil.toggleClass('abrir-cerrar');

	});
});
