#include <sched.h>
#include <stdlib.h>

int main(int argc, char** argv) {
    if (sched_yield() != 0) {
        return 1;
    }
    // RuntimeError: unreachable
    //      at abort (<anonymous>:wasm-function[18]:0x423)
    // ...
    //abort();
    //raise(SIGINT);
    return 0;
}

