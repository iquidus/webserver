define(["lib/react","lib/clib"],function(e,t){var n=e.DOM;return e.createClass({displayName:"Calculator",getInitialState:function(){return{amount:100,cashOut:200,err:null}},checkErr:function(e,t){return Number.isNaN(e)?"Table amount must be set":Number.isNaN(t)?"Cashout amount must be set":e<1?"Table amount must be at least 1":t<1?"Cashout amount must be at least 1":t<e?"Cashout amount must be equal to or greater than table amount":null},render:function(){var e=this,r;return this.state.err?r=[n.tr({key:"err"},n.td(null,"Error: "),n.td(null,this.state.err))]:r=[n.tr({key:"winProb"},n.th(null,"Probability of Winning:"),n.td(null,t.winProb(this.state.amount,this.state.cashOut)*100,"%")),n.tr({key:"winProfit"},n.th(null,"Profit if win:"),n.td(null,t.profit(this.state.amount,this.state.cashOut))),n.tr({key:"houseExpected"},n.th(null,"House Expected Return:"),n.td(null,t.houseExpectedReturn(this.state.amount,this.state.cashOut))),n.tr({key:"houseMargin"},n.th(null,"House Margin:"),n.td(null,t.houseExpectedReturn(this.state.amount,this.state.cashOut)/this.state.amount*100,"%"))],n.table(null,n.tbody(null,n.tr(null,n.th(null,"Table Amount (Initial Wager):"),n.td(null,n.input({type:"number",value:this.state.amount,min:1,onChange:function(t){var n=parseInt(t.target.value),r=e.checkErr(n,e.state.cashOut);e.setState({amount:n,err:r})}}))),n.tr(null,n.th(null,"Intended Cashout:"),n.td(null,n.input({type:"number",value:this.state.cashOut,min:2,onChange:function(t){var n=parseInt(t.target.value),r=e.checkErr(e.state.amount,n);e.setState({cashOut:n,err:r})}}))),r))}})});