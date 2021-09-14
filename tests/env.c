#include <stdlib.h>

int main(int argc, char** argv) {
    char* path = getenv("PATH");
    if (path != NULL) {
        return 1;
    }
    return 0;
}
