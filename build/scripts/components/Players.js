define(["lib/react","lib/clib","lib/lodash","stores/EngineVirtualStore"],function(e,t,n,r){function o(e,t){return(t-100)*e/100}function u(){return{engine:r.getState()}}var i=e.DOM,s=e.addons.classSet;return e.createClass({displayName:"usersPlaying",getInitialState:function(){return u()},componentDidMount:function(){r.addChangeListener(this._onChange)},componentWillUnmount:function(){r.removeChangeListener(this._onChange)},_onChange:function(){this.isMounted()&&this.setState(u())},render:function(){var e=this,r=[],u=[],a,f,l,c,h,p=e.state.engine;p.gameState==="STARTING"?u=e.state.engine.joined.map(function(t){var n;return t===e.state.engine.username&&(n=e.state.engine.nextBetAmount),{username:t,bet:n}}):(n.forEach(p.playerInfo,function(e,t){e.username=t,e.stopped_at?r.push(e):u.push(e)}),r.sort(function(e,t){var n=t.stopped_at-e.stopped_at;return n!==0?n:e.username<t.username?1:-1}),u.sort(function(e,t){var n=t.bet-e.bet;return n!==0?n:e.username<t.username?1:-1}));if(p.gameState==="IN_PROGRESS"||p.gameState==="STARTING"){var d,v,m=p.gameState==="IN_PROGRESS"?"bonus-projection":"";f=[];for(d=0,v=u.length;d<v;d++){var g=u[d],y=p.gameState==="IN_PROGRESS"?g.bonus?t.formatDecimals(g.bonus*100/g.bet,2)+"%":"0%":"-",b=s({"user-playing":!0,me:e.state.engine.username===g.username});f.push(i.tr({className:b,key:"user"+d},i.td(null,i.a({href:"/user/"+g.username,target:"_blank"},g.username)),i.td(null,"-"),i.td(null,g.bet?t.formatSatoshis(g.bet,0):"?"),i.td({className:m},y),i.td(null,"-")))}a=[];for(d=0,v=r.length;d<v;d++){var g=r[d],w=o(g.bet,g.stopped_at),y=p.gameState==="IN_PROGRESS"?g.bonus?t.formatDecimals(g.bonus*100/g.bet,2)+"%":"0%":"-",b=s({"user-cashed":!0,me:e.state.engine.username===g.username});a.push(i.tr({className:b,key:"user"+d},i.td(null,i.a({href:"/user/"+g.username,target:"_blank"},g.username)),i.td(null,g.stopped_at/100+"x"),i.td(null,t.formatSatoshis(g.bet,0)),i.td({className:m},y),i.td(null,t.formatSatoshis(w))))}l=i.tbody({className:""},f,a),c="users-playing-container",h="users-playing"}else p.gameState==="ENDED"&&(f=u.map(function(n,r){var o=n.bet,u=n.bonus,a=-o;u?(a=t.formatSatoshis(a+u),u=t.formatDecimals(u*100/o,2)+"%"):(a=t.formatSatoshis(a),u="0%");var f=s({"user-lost":!0,me:e.state.engine.username===n.username});return i.tr({className:f,key:"user"+r},i.td(null,i.a({href:"/user/"+n.username,target:"_blank"},n.username)),i.td(null,"-"),i.td(null,t.formatSatoshis(n.bet,0)),i.td(null,u),i.td(null,a))}),a=r.map(function(n,r){var o=n.bet,u=n.bonus,a=n.stopped_at,f=o*(a-100)/100;u?(f=t.formatSatoshis(f+u),u=t.formatDecimals(u*100/o,2)+"%"):(f=t.formatSatoshis(f),u="0%");var l=s({"user-won":!0,me:e.state.engine.username===n.username});return i.tr({className:l,key:"user"+r},i.td(null,i.a({href:"/user/"+n.username,target:"_blank"},n.username)),i.td(null,a/100,"x"),i.td(null,t.formatSatoshis(o,0)),i.td(null,u),i.td(null,f))}),l=i.tbody({className:""},f,a),c="users-cashed-container",h="users-summary");return i.div({className:c},i.table({className:h},i.thead(null,i.tr(null,i.th(null,"User"),i.th(null,"@"),i.th(null,"Bet"),i.th(null,"Bonus"),i.th(null,"Profit"))),l))}})});