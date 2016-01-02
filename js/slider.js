// Thank you noUi slider (http://refreshless.com/nouislider/)
// for your amazing slider options. I used this plugin along
// with the normal bootstrap popover class in order to make this. 
// The popover required some tweaking in order to get it functioning
// the way I wanted to but overall it works pretty well now.

// Create a new date from a string, return as a timestamp.
function timestamp(str){
	return new Date(str).getTime();   
}

// Create a list of day and monthnames.
var
	months = [
		"Jan", "Feb", "Mar",
		"Apr", "May", "Jun", "Jul",
		"Aug", "Sep", "Oct",
		"Nov", "Dec"
	];

// Append a suffix to dates.
// Example: 23 => 23rd, 1 => 1st.
function nth (d) {
	if(d>3 && d<21) return 'th';
	switch (d % 10) {
		case 1:  return "st";
		case 2:  return "nd";
		case 3:  return "rd";
		default: return "th";
	}
}

// Create a string representation of the date.
function formatDate ( date ) {
	return months[date.getMonth()] + " " +
		date.getDate() + nth(date.getDate()) + ", " +
		date.getFullYear();
}

var dateSlider = document.getElementById('slider-date');

noUiSlider.create(dateSlider, {
	// Create two timestamps to define a range.
	range: {
		min: timestamp('2015'),
		max: timestamp('2016')
	},

	// Steps of one week
	step: 7 * 24 * 60 * 60 * 1000,

	// Two more timestamps indicate the handle starting positions.
	// start: [ timestamp('2015'), timestamp('2016') ],

	start: [ timestamp('2015') ],

	// No decimals
	format: wNumb({
		decimals: 0
	})
});

// Our two handles wraped in jQuery
var dateValues = [
	$('.noUi-handle-lower')
];

// The event when one of the handles is updated. This has been
// changed from the one in the demo to incorporate updating the
// bootstrap popovers instead of a separate element.
dateSlider.noUiSlider.on('update', function( values, handle ) {
	$(dateValues[handle]).attr('data-content', formatDate(new Date(+values[handle])));
	$('#hidden-date').attr('value', formatDate(new Date(+values[handle])));
	$('#hidden-date').trigger('input');
});

// Our custom event listeners. I did it this way because
// the slider update event above changes the data-content attribute
// on the handle. BUT if the handle is still being shown then bootstrap
// will not update the content. My solution was to hide the handle
// when we're changing the date (mousedown) and then showing it 
// again when we're done (mouseup). A bit hacky but, hell, it works.
$(dateValues).each(function(i, el){
	el.mouseover(function(el){
		$(this).popover('show');
	});
	el.mouseleave(function(el){
		$(this).popover('hide');
	});
	el.mousedown(function(el){
		$(this).popover('hide');
	});
	el.mouseup(function(el){
		$(this).popover('show');
	})
});

// Setup our handles with popovers
$('.noUi-handle-lower').attr('data-toggle', 'popover').attr('data-placement', 'bottom').attr('data-trigger', 'manual').attr('ng-model', 'startDate');