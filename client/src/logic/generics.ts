export default class Generics{
    public static parseTime(seconds:number){
        const hours = Math.floor(seconds / 3600)
        seconds -= hours * 3600

        const mins = Math.floor(seconds / 60)
        seconds -=  mins * 60

        return `${hours}:${mins}:${Math.floor(seconds)}`
    }
}