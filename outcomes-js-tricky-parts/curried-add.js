function curriedAdd(total) {
    if(!total) return 0;
    return function add(next){
        if(next === undefined) return total;
        total = total + next
        return add;
    }
}

module.exports = { curriedAdd };
