YUI.add("view-node-map",function(e,t){function i(){}var n=e.namespace("View._buildCfg"),r=new e.Node.WeakMap;n.aggregates||(n.aggregates=[]),n.aggregates.push("getByNode"),i.getByNode=function(t){var n;return e.one(t).ancestor(function(e){return(n=r.get(e))||!1},!0),n||null},i._instances=r,i.prototype={initializer:function(){r.set(this.get("container"),this)},destructor:function(){r["delete"](this.get("container"))}},e.View.NodeMap=i},"@VERSION@",{requires:["view"]});
