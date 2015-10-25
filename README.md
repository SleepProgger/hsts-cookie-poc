## hsts-cookie-poc##
HTTP Strict Transport Security (HSTS) is a way to tell your visitors browser it should only load files from your domain over an https connection from now on.  
This information is store- and collectable (bit by bit).  
This is described [here](http://www.radicalresearch.co.uk/lab/hstssupercookies), [here](http://www.leviathansecurity.com/blog/the-double-edged-sword-of-hsts-persistence-and-privacy/) and even the [RFC](https://www.rfc-editor.org/rfc/rfc6797.txt) says about HSTS:

    Such a technique could potentially be abused as yet another form of"web tracking" [WebTracking].

Restrictions
------------
- You need a bunch of "trusted" (not self signed) SSL certificates for different domains or an "trusted" wildcard certificate.
- Every domain allows to store exactly **one bit** information in the users browser. So if you control 8 domains you can store values up to 255.

Example
------------
    var domains = [
        'http://a.test.bar/sec/hsts_tracking/hsts_cookie.php',
        'http://b.test.bar/sec/hsts_tracking/hsts_cookie.php',
        'http://c.test.bar/sec/hsts_tracking/hsts_cookie.php',
        'http://d.test.bar/sec/hsts_tracking/hsts_cookie.php',
    ];
    var hsts_cookie = HSTS_Cookie(domains);
    var value = 5;
    hsts_cookie.set_hsts_as_int(value, function(){
        alert('Saved ' + value);
        hsts_cookie.get_hsts_as_int(function(int_val){
            alert('Loaded ' + int_val);
        });
    });
Or see *hsts_cookie.html*
