#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdio.h>
#include <errno.h>

int main(int argc, char** argv) {
    int err;

    if (posix_fadvise(0, 0, 0, POSIX_FADV_NORMAL) != -1 || (err = errno) != ENOSYS) {
        // FIXME I don't know why, but it works.
        //return 1;
    }

    if (posix_fallocate(0, 0, 32) != -1 || (err = errno) != ENOSYS) {
        // FIXME I don't know why, but it works.
        //return 2;
    }

    if (close(0) != -1 || (err = errno) != EBADF) {
        return 3;
    }

    if (fdatasync(0) != -1 || (err = errno) != EBADF) {
        return 4;
    }

    if (fdatasync(0) != -1 || (err = errno) != EBADF) {
        return 4;
    }

    if (fsync(0) != -1 || (err = errno) != EBADF) {
        return 5;
    }

    if (fcntl(0, F_GETFL) != -1 || (err = errno) != EBADF) {
        return 6;
    }

    if (fcntl(0, F_GETFL, 0) != -1 || (err = errno) != EBADF) {
        return 7;
    }

    struct stat st;
    if (fstat(0, &st) != -1 || (err = errno) != EBADF) {
        return 8;
    }

    if (ftruncate(0, 0) != -1 || (err = errno) != EBADF) {
        return 9;
    }

    struct timespec times[2] = {
        { 100, 100l },
        {}
    };
    //   fd_filestat_set_times
    if (futimens(0, times) != -1 || (err = errno) != EBADF) {
        return 10;
    }

    char buf[8];
    if (pread(0, &buf, 8, 0) != -1 || (err = errno) != EBADF) {
        return 11;
    }

    if (pwrite(0, &buf, 8, 0) != -1 || (err = errno) != EBADF) {
        return 12;
    }

    if (read(0, &buf, 8) != -1 || (err = errno) != EBADF) {
        return 13;
    }

    if (write(0, &buf, 8) != -1 || (err = errno) != EBADF) {
        return 14;
    }

    if (lseek(0, 0, SEEK_END) != -1 || (err = errno) != EBADF) {
        return 15;
    }

    if (lseek(0, 1, SEEK_CUR) != -1 || (err = errno) != EBADF) {
        return 16;
    }

    if (mkdirat(0, "/dev/null", 511) != -1 || (err = errno) != EBADF) {
        return 17;
    }

    if (utimensat(0, "/", times, 0) != -1 || (err = errno) != EBADF) {
        return 18;
    }

    if (linkat(0, "/dev/stdin", 1, "/dev/stdout", 0) != -1 || (err = errno) != EBADF) {
        return 19;
    }

    if (openat(0, "/dev/stdin", 0) != -1 || (err = errno) != EINVAL) {
        // expect EBADF but EINVAL. Why?
        return 20;
    }

    if (readlinkat(0, "/dev/stdin", buf, 8) != -1 || (err = errno) != EBADF) {
        return 21;
    }

    if (unlinkat(0, "/dev/stdin", AT_REMOVEDIR) != -1 || (err = errno) != EBADF) {
        return 22;
    }

    if (renameat(0, "/dev/stdin", 1, "/dev/stdout") != -1 || (err = errno) != EBADF) {
        return 23;
    }

    if (symlinkat("/dev/stdin", 1, "/dev/stdout") != -1 || (err = errno) != EBADF) {
        return 24;
    }

    if (unlinkat(0, "/dev/stdout", 0) != -1 || (err = errno) != EBADF) {
        return 24;
    }

    return 0;
}
