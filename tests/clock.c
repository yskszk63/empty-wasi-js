#include <time.h>
#include <errno.h>

int main(int argc, char** argv) {
    int ret;
    struct timespec ts;

    ret = clock_getres(CLOCK_REALTIME, &ts);
    if (ret != -1 || errno != EINVAL) {
        return 1;
    }

    ret = clock_gettime(CLOCK_REALTIME, &ts);
    if (ret != -1 || errno != EINVAL) {
        return 1;
    }

    return 0;
}
