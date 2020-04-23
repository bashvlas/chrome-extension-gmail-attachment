( function () {

	function wait ( time ) {

		return new Promise( function ( resolve ) {

			setTimeout( resolve, time );

		});

	};

	function change_default_create_element ( doc ) {

		var old_create_element = doc.createElement;

		doc.createElement = function () {

			if (
				should_replace_input_elements &&
				arguments[ 0 ] === "input"
			) {

				console.log( "attaching file" );

				var result = doc.createElement( "div" );

				return result;

			};

			return old_create_element.apply( this, arguments );

		};

	};

	function simulate_change_event_on_real_input ( input ) {

		var event = document.createEvent( "HTMLEvents" );
		event.initEvent( "change", false, true );
		input.dispatchEvent( event );

	};

	function simulate_change_event_on_fake_input ( fake_input_element ) {

		var data_blob = new Blob( [ "example" ], { type: "text/plain" } );

		data_blob.lastModifiedDate = new Date();
		data_blob.name = "example.txt";

		fake_input_element.files = [ data_blob ];

		var event = document.createEvent( "HTMLEvents" );
		event.initEvent( "change", false, true );
		fake_input_element.dispatchEvent( event, { bubbles: true });

	};

	async function attach_example_file () {

		change_default_create_element( document );

		var attach_files_button = document.querySelector( "div.a1" );

		var input = document.querySelector( "div.wG[ command = 'Files' ]+input" );

		should_replace_input_elements = true;

		dispatch_change_event_on_real_input( input );

		await wait( 1000 );

		var fake_input_element = document.querySelector( "div.wG[ command = 'Files' ]+div" );

		should_replace_input_elements = false;

		dispatch_change_event_on_fake_input( fake_input_element );

	};

	attach_example_file();

} () );
