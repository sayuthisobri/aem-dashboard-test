#!/bin/bash
ng build --prod --output-path docs --base-href \/aem-dashboard-test\/
cp ./docs/index.html ./docs/404.html
