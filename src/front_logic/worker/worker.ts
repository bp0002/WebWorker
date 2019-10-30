/**
 * Worker 管理
 */

export class WorkerManager {
    public static workerMap: Map<string, Worker> = new Map();
    public static create(url: string, wname: string, opt?: WorkerOptions) {
        const worker = new Worker(url, opt);
        this.workerMap.set(wname, worker);
        return worker;
    }
    public static destroy(wname: string) {
        const worker = this.workerMap.get(wname);

        if (worker) {
            //
        }

        this.workerMap.delete(wname);
    }
}