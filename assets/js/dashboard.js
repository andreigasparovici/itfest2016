if (!isTouchDevice()) {
  $('[data-toggle*="tooltip"]').tooltip();
}

// utility

function isTouchDevice() {
	return !!('ontouchstart' in window || navigator.msMaxTouchPoints);
}