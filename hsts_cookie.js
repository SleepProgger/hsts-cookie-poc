var HSTS_Cookie = function(domains){
	// TODO: should we clone the domains array here ? How js clojures are working ?
	var fields = [];
	var remaining = 0;
	var working = false;
	
	function create_request(i, src, callback){
		var img = document.createElement('img');
		img.src = src + '#' + parseInt(Math.random()*32000); // prevent caching
		img.onload = function(){
			//console.log('true for', i);
			fields[i] = true;
			remaining -= 1;
			if(remaining <= 0){
				working = false;
				callback(fields);
			}
		};
		img.onerror = function(){
			//console.log('error for', i);
			fields[i] = false;
			remaining -= 1;
			if(remaining <= 0){
				working = false;
				callback(fields);
			}
		};
		return img;
	}
	
	function pad(value, length) {
		return (value.toString().length < length) ? pad("0"+value, length):value;
	}

	function bools_to_int(bools){
		var n = 0; l = bools.length;
		for (var i = 0; i < l; ++i) {
			n = (n << 1) + (bools[i] ? 1 : 0);
		}
		return n;
	}
	
	function int_to_bools(value, bit_count){
		var bools = [];
		var bits = parseInt(value, 10).toString(2);
		bits = pad(bits, 32);
		for(var i=32-bit_count; i < 32; ++i){
			bools.push(bits[i]=='1' ? true : false);
		}
		return bools;
	}
	
	return {
		'get_hsts_value': function (callback){
			if(working) return false;
			working = true;
			fields = [];
			remaining = domains.length;
			for(var i = 0; i < domains.length; ++i){
				fields.push(undefined);
				//console.log('ask for ', i, domains[i]);
				var img = create_request(i, domains[i], callback);
			}
			return true;
		},
		
		'set_hsts_value': function (values, callback){
			if(working) return false;
			working = true;
			fields = [];
			remaining = domains.length;
			for(var i = 0; i < domains.length; ++i){
				fields.push(undefined);
				if(values[i])
					create_request(i, domains[i]+'?SET=1', callback);
				else
					create_request(i, domains[i]+'?DEL=1', callback);
			}
			return true;
		},
		
		'set_hsts_as_int': function (value, callback){
			var value = int_to_bools(value, domains.length);
			return this.set_hsts_value(value, callback);
		},
		
		'get_hsts_as_int': function ( callback){
			return this.get_hsts_value(function(fields){
				callback(bools_to_int(fields));
			});
		}
	};
}



			
			
			
			
			

			

			
			// -----------------------------------------------------
			// Utils stuff
			// -----------------------------------------------------

