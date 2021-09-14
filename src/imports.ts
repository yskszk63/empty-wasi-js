/// see: https://github.com/WebAssembly/WASI/blob/main/phases/snapshot/docs.md

const ESUCCESS = 0;
const EBADF = 8;
const EINVAL = 28;
const EIO = 29;
const ENOSYS = 52

export class ExitStatus {
    code: number;
    constructor(code: number) {
        this.code = code;
    }
}

export class Signal extends Error {
    sig: number;
    constructor(sig: number) {
        super(`Signal raised.${sig}`);
        this.sig = sig;
    }
}

export class EmptyWasiImports {
    _memory?: WebAssembly.Memory;

    get memory(): WebAssembly.Memory {
        return this._memory!;
    }

    args_get (_argv: number, _argv_buf: number): number {
        return ESUCCESS;
    }

    args_sizes_get = (argc: number, bufsize: number): number => {
        const mem = new DataView(this.memory.buffer);
        mem.setUint32(argc, 0, true);
        mem.setUint32(bufsize, 0, true);
        return ESUCCESS;
    }

    environ_get (_environ: number, _environ_buf: number): number {
        return EINVAL;
    }

    environ_sizes_get = (envc: number, bufsize: number): number => {
        const mem = new DataView(this.memory.buffer);
        mem.setUint32(envc, 0, true);
        mem.setUint32(bufsize, 0, true);
        return ESUCCESS;
    }

    clock_res_get(_id: number): number {
        return EINVAL;
    }

    clock_time_get(_id: number, _precision: number): number {
        return EINVAL;
    }

    fd_advise(_fd: number, _offset: number, _len: number, _advice: number): number {
        return ENOSYS;
    }

    fd_allocate(_fd: number, _offset: number, _len: number): number {
        return ENOSYS;
    }

    fd_close(_fd: number): number {
        return EBADF;
    }

    fd_datasync(_fd: number): number {
        return EBADF;
    }

    fd_fdstat_get(_fd: number): number {
        return EBADF;
    }

    fd_fdstat_set_flags(_fd: number, _flags: number): number {
        return EBADF;
    }

    fd_fdstat_set_rights(_fd: number, _fs_rights_base: number, _fs_rights_inheriting: number): number {
        return EBADF;
    }

    fd_filestat_get(_fd: number): number {
        return EBADF;
    }

    fd_filestat_set_size(_fd: number): number {
        return EBADF;
    }

    fd_filestat_set_times(_fd: number): number {
        return EBADF;
    }

    fd_pread(_fd: number, _iovs: number, _offset: number): number {
        return EBADF;
    }

    fd_prestat_get(_fd: number): number {
        return EBADF;
    }

    fd_prestat_dir_name(_fd: number, _path: number, _path_len: number): number {
        return EBADF;
    }

    fd_pwrite(_fd: number, _iovs: number, _offset: number): number {
        return EBADF;
    }

    fd_read(_fd: number, _iovs: number): number {
        return EBADF;
    }

    fd_readdir(_fd: number, _buf: number, _buf_len: number, _cookie: number): number {
        return EBADF;
    }

    fd_renumber(_fd: number, _to: number): number {
        return EBADF;
    }

    fd_seek(_fd: number, _offset: number, _whence: number): number {
        return EBADF;
    }

    fd_sync(_fd: number): number {
        return EBADF;
    }

    fd_tell(_fd: number): number {
        return EBADF;
    }

    fd_write(_fd: number, _iovs: number): number {
        return EBADF;
    }

    path_create_directory(_fd: number, _path: number): number {
        return EBADF;
    }

    path_filestat_get(_id: number, _flags: number, _path: number): number {
        return EBADF;
    }

    path_filestat_set_times(_fd: number, _flags: number, _path: number, _atime: number/*BigInt*/, _mtime: number/*BigInt*/, _fst_flags: number): number {
        return EBADF;
    }

    path_link(_old_fd: number, _old_flags: number, _old_path: number, _new_fd: number, _new_path: number): number {
        return EBADF;
    }

    path_open(_fd: number, _dirflags: number, _path: number, _oflags: number, _fs_rights_base: number, _fs_rights_inheriting: number, _rights: number, _fdflags: number): number {
        return EBADF;
    }

    path_readlink(_fd: number, _path: number, _buf: number, _buf_len: number): number {
        return EBADF;
    }

    path_remove_directory(_fd: number, _path: number): number {
        return EBADF;
    }

    path_rename(_fd: number, _old_name: number, _new_fd: number, _new_path: number): number {
        return EBADF;
    }

    path_symlink(_old_path: number, _fd: number, _new_path: number): number {
        return EBADF;
    }

    path_unlink_file(_fd: number, _path: number): number {
        return EBADF;
    }

    poll_oneoff(_in: number, _out: number, _numsubscriptions: number): number {
        return ENOSYS;
    }

    proc_exit(rval: number) {
        throw new ExitStatus(rval);
    }

    proc_raise(sig: number): number {
        throw new Signal(sig);
    }

    sched_yield(): number {
        return ESUCCESS;
    }

    random_get(_buf: number, _buf_len: number): number {
        return EIO;
    }

    sock_recv(_fd: number, _ri_data: number, _ri_flags: number): number {
        return EBADF;
    }

    sock_send(_fd: number, _si_data: number, _si_flags: number): number {
        return EBADF;
    }

    sock_shutdown(_fd: number): number {
        return EBADF;
    }

}
