
const Order=require("../../../models/order")
function statusController(){
   
    return {
        

        async update(req, res) {

            console.log("update");
            console.log(req.body.orderId);
            try {
                await Order.updateOne({_id: req.body.orderId }, { status: req.body.status });
                 
                //getting emitter
                const eventEmitter=req.app.get('eventEmitter');
                eventEmitter.emit('orderUpdated',{id:req.body.orderId,status:req.body.status})

                return res.redirect("/admin/orders");
            } catch (err) {
                console.log(err);
                return res.redirect("/admin/orders");
            }
        }
        

    }
}

module.exports=statusController;