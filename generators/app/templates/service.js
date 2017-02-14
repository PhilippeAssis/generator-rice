Rice.addService("<%= name  %>", () => {
    
    this.start = () => {
        
    }
    
    this.stop = (next) => {
        next(null)
    }
    
    this.restart = (next) => {
        next(null)
    }
    
    this.reload = (next) => {
        next(null)
    }
    
    return this;
})