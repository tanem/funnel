STANDALONE_DIR = standalone

build: components src/funnel.js
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components $(STANDALONE_DIR)

test: build
	@npm install
	@testling

standalone: build
	@component build --standalone Funnel --out $(STANDALONE_DIR) --name funnel
	@uglifyjs $(STANDALONE_DIR)/funnel.js > $(STANDALONE_DIR)/funnel.min.js

jshint:
	@jshint src/*.js test/*.js

.PHONY: clean test
