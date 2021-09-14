CC = clang
CFLAGS = --target=wasm32-wasi --sysroot=/opt/wasi-sdk/wasi-sysroot -D_WASI_EMULATED_SIGNAL -lwasi-emulated-signal
#CFLAGS = --target=wasm32-wasi --sysroot=/opt/wasi-sdk/wasi-sysroot
TARGETS = args.wasm env.wasm clock.wasm fd.wasm etc.wasm

.SUFFIXES: .c .wasm
.PHONY: all clean test test-node test-deno

all: test

test: test-node test-deno

test-node: $(TARGETS)
	echo $(TARGETS) | xargs -n1 node $(CURDIR)/nodetest.mjs

test-deno: $(TARGETS)
	echo $(TARGETS) | xargs -n1 deno run --allow-read $(CURDIR)/denotest.ts

.c.wasm:
	$(CC) $(CFLAGS) -o $@ $<

clean:
	$(RM) $(TARGETS)
