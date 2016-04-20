'use strict';
require('express')().use(require('express').static('build'))
.listen(8080, ()=> console.log('Cli-Server Port 8080 is listening.. :P '));
