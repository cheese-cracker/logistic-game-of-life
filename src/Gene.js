class Gene {
    constructor (val, states=2){
        this.state = val
        this.no_states = states
    }

    change(){
        this.state += 1
        this.state %= this.no_states
    }
    
    set (val){
        this.state = val
    }

    convolve(parentsarray) {
        parentsarray.forEach((el)=>{
            this.state += el.state
        })
        this.state %= this.no_states
    }

    mutatestate(){
        this.state = Math.floor(Math.random * this.no_states)
    }

    simulate(threshold, callback){
        let simulation = Math.random();
        if(simulation > threshold){ callback(this) }
    }
}
export default Gene
