all:
	rm -fr dist/
	mkdir dist
	zip -r dist/ber-helper.zip \
bower_components/jquery/dist/jquery.min.js \
bower_components/remodal/dist/jquery.remodal.min.js \
src/css \
src/js \
icons \
manifest.json
