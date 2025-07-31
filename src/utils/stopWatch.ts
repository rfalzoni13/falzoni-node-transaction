export default class StopWatch {
    private startTime: number
    private endTime: number
    private running: boolean

    constructor() {
        this.startTime = 0
        this.endTime = 0
        this.running = false
    }

    start() {
        if (this.running) {
            throw new Error("O cronômetro já está em execução.")
        }
        this.startTime = Date.now()
        this.running = true
    }

    stop() {
        if (!this.running) {
            throw new Error("O cronômetro não está em execução.")
        }
        this.endTime = Date.now()
        this.running = false
    }

    getDurationInMilliseconds(): number {
        if (this.running) {
            throw new Error("O cronômetro ainda está em execução.")
        }
        return this.endTime - this.startTime
    }
}