Rice.addService("<%= name  %>", () => {
    
    this.start = () => {
        
    }
    
    this.stop = (next) => {
        next()
    }
    
    return this;
    
})