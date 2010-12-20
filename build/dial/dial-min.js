YUI.add("dial",function(b){var c=false,d;if(b.UA.ie&&b.UA.ie<9){c=true;}var e=b.Lang,i=b.Widget,f=b.Node;function h(j){h.superclass.constructor.apply(this,arguments);}h.NAME="dial";h.ATTRS={min:{value:-220},max:{value:220},diameter:{value:100},value:{value:0,validator:function(j){return this._validateValue(j);}},minorStep:{value:1},majorStep:{value:10},stepsPerRev:{value:100},decimalPlaces:{value:0},strings:{valueFn:function(){return b.Intl.get("dial");}},handleDist:{value:0.75}};function g(j){return b.ClassNameManager.getClassName(h.NAME,j);}h.CSS_CLASSES={label:g("label"),labelString:g("label-string"),valueString:g("value-string"),northMark:g("north-mark"),ring:g("ring"),ringVml:g("ring-vml"),marker:g("marker"),markerUser:g("marker-user"),centerButton:g("center-button"),centerButtonVml:g("center-button-vml"),resetString:g("reset-str"),handle:g("handle"),handleUser:g("handle-user"),markerHidden:g("marker-hidden"),dragging:b.ClassNameManager.getClassName("dd-dragging")};var a=h.CSS_CLASSES.label+b.guid();h.LABEL_TEMPLATE='<div id="'+a+'" class="'+h.CSS_CLASSES.label+'"><span class="'+h.CSS_CLASSES.labelString+'">{label}</span><span class="'+h.CSS_CLASSES.valueString+'"></span></div>';if(c===false){h.RING_TEMPLATE='<div class="'+h.CSS_CLASSES.ring+'"><div class="'+h.CSS_CLASSES.northMark+'"></div></div>';h.MARKER_TEMPLATE='<div class="'+h.CSS_CLASSES.marker+" "+h.CSS_CLASSES.markerHidden+'"><div class="'+h.CSS_CLASSES.markerUser+'"></div></div>';h.CENTER_BUTTON_TEMPLATE='<div class="'+h.CSS_CLASSES.centerButton+'"><div class="'+h.CSS_CLASSES.resetString+'">{resetStr}</div></div>';h.HANDLE_TEMPLATE='<div class="'+h.CSS_CLASSES.handle+'"><div class="'+h.CSS_CLASSES.handleUser+'" aria-labelledby="'+a+'" aria-valuetext="" aria-valuemax="" aria-valuemin="" aria-valuenow="" role="slider"  tabindex="0" title="{tooltipHandle}"></div></div>';}else{h.RING_TEMPLATE='<div class="'+h.CSS_CLASSES.ring+" "+h.CSS_CLASSES.ringVml+'">'+'<div class="'+h.CSS_CLASSES.northMark+'"></div>'+'<v:oval strokecolor="#ceccc0" strokeweight="1px"><v:fill type=gradient color="#8B8A7F" color2="#EDEDEB" angle="45"/></v:oval>'+"</div>"+"";h.MARKER_TEMPLATE='<div class="'+h.CSS_CLASSES.marker+" "+h.CSS_CLASSES.markerHidden+'">'+'<xml:namespace ns="urn:schemas-microsoft-com:vml" prefix="v"/><v:oval stroked="false" class="'+h.CSS_CLASSES.markerUser+'">'+'<v:fill opacity="20%" color="#000"/>'+"</v:oval>"+"</div>"+"";h.CENTER_BUTTON_TEMPLATE='<div class="'+h.CSS_CLASSES.centerButton+" "+h.CSS_CLASSES.centerButtonVml+'">'+'<v:oval strokecolor="#ceccc0" strokeweight="1px">'+'<v:fill type=gradient color="#C7C5B9" color2="#fefcf6" colors="35% #d9d7cb, 65% #fefcf6" angle="45"/>'+'<v:shadow on="True" color="#000" opacity="10%" offset="2px, 2px"/>'+"</v:oval>"+'<div class="'+h.CSS_CLASSES.resetString+'">{resetStr}</div>'+"</div>"+"";h.HANDLE_TEMPLATE='<div class="'+h.CSS_CLASSES.handle+'">'+'<v:oval stroked="false" class="'+h.CSS_CLASSES.handleUser+'"'+' aria-labelledby="'+a+'" aria-valuetext="" aria-valuemax="" aria-valuemin="" aria-valuenow="" role="slider"  tabindex="0" title="{tooltipHandle}">'+'<v:fill opacity="20%" color="#6C3A3A"/>'+"</v:oval>"+"</div>"+"";}b.extend(h,i,{renderUI:function(){this._renderLabel();this._renderRing();this._renderMarker();this._renderCenterButton();this._renderHandle();this.contentBox=this.get("contentBox");this._centerX=this.get("diameter")/2;this._centerY=this.get("diameter")/2;this._handleDist=this._centerX*this.get("handleDist");this._originalValue=this.get("value");this._timesWrapped=0;this._angle=this._getAngleFromValue(this.get("value"));this._setTimesWrapedFromValue(this.get("value"));this._handleUserNode.set("aria-valuemin",this.get("min"));this._handleUserNode.set("aria-valuemax",this.get("max"));},bindUI:function(){this.after("valueChange",this._afterValueChange);var k=this.get("boundingBox"),l=(!b.UA.opera)?"down:":"press:",m=(!b.UA.opera)?"down:":"press:";l+="38, 40, 33, 34, 35, 36";m+="37, 39";b.on("key",b.bind(this._onDirectionKey,this),k,l);b.on("key",b.bind(this._onLeftRightKey,this),k,m);b.on("mouseenter",b.bind(this._dialCenterOver,this),this._centerButtonNode);b.on("mouseleave",b.bind(this._dialCenterOut,this),this._centerButtonNode);b.on("click",b.bind(this._resetDial,this),this._centerButtonNode);b.on("mousedown",b.bind(function(){this._handleUserNode.focus();},this),this._handleNode);var j=new b.DD.Drag({node:this._handleNode,on:{"drag:drag":b.bind(this._handleDrag,this),"drag:start":b.bind(this._handleDragStart,this),"drag:end":b.bind(this._handleDragEnd,this)}});},_setTimesWrapedFromValue:function(j){if(j%this.get("stepsPerRev")===0){this._timesWrapped=(j/this.get("stepsPerRev"))-1;}else{this._timesWrapped=Math.floor(j/this.get("stepsPerRev"));}},_dialCenterOver:function(j){this._resetString.setContent(b.substitute("{resetStr}",this.get("strings")));},_dialCenterOut:function(j){this._resetString.setContent("");},_handleDrag:function(m){var k=Math.atan((this._centerYOnPage-m.pageY)/(this._centerXOnPage-m.pageX))*(180/Math.PI),j=(this._centerXOnPage-m.pageX);if(j<0){k=(k+90);}else{k=(k-90);}if(m.pageY<this._centerYOnPage){if((this._prevX<=this._centerXOnPage)&&(m.pageX>this._centerXOnPage)){this._timesWrapped=(this._timesWrapped+1);}else{if((this._prevX>this._centerXOnPage)&&(m.pageX<=this._centerXOnPage)){this._timesWrapped=(this._timesWrapped-1);}}}this._prevX=m.pageX;var l=this._getValueFromAngle(k);if((l>this.get("min"))&&(l<this.get("max"))){this.set("value",l);}else{if(l>this.get("max")){this.set("value",this.get("max"));}else{if(l<this.get("min")){this.set("value",this.get("min"));}}}},_handleDragStart:function(j){this._markerNode.removeClass(h.CSS_CLASSES.markerHidden);if(!this._prevX){this._prevX=this._handleNode.getX();}this._centerYOnPage=(this._ringNode.getY()+this._centerY);this._centerXOnPage=(this._ringNode.getX()+this._centerX);},_handleDragEnd:function(){var j=this._handleNode;j.transition({duration:0.08,easing:"ease-in",left:this._setNodeToFixedRadius()[0]+"px",top:this._setNodeToFixedRadius()[1]+"px"},b.bind(function(){this._markerNode.addClass(h.CSS_CLASSES.markerHidden);
this._prevX=this._handleNode.getX();},this));this._setTimesWrapedFromValue(this.get("value"));},_setNodeToFixedRadius:function(m){var k=(this._angle-90),j=(Math.PI/180);var l=Math.round(Math.sin(k*j)*this._handleDist);var n=Math.round(Math.cos(k*j)*this._handleDist);if(m){m.setXY([(this._ringNode.getX()+this._centerX+n),(this._ringNode.getY()+this._centerY+l)]);}else{return[this._centerX+n,this._centerX+l];}},syncUI:function(){this._uiSetValue(this.get("value"));},_renderLabel:function(){var j=this.get("contentBox"),k=j.one("."+h.CSS_CLASSES.label);if(!k){k=f.create(b.substitute(h.LABEL_TEMPLATE,this.get("strings")));j.append(k);}this._labelNode=k;this._valueStringNode=this._labelNode.one("."+h.CSS_CLASSES.valueString);},_renderRing:function(){var j=this.get("contentBox"),k=j.one("."+h.CSS_CLASSES.ring);if(!k){k=j.appendChild(h.RING_TEMPLATE);k.setStyles({width:this.get("diameter")+"px",height:this.get("diameter")+"px"});}this._ringNode=k;},_renderMarker:function(){var k=this.get("contentBox"),j=k.one("."+h.CSS_CLASSES.marker);if(!j){j=k.one("."+h.CSS_CLASSES.ring).appendChild(h.MARKER_TEMPLATE);}this._markerNode=j;this._markerUserNode=this._markerNode.one("."+h.CSS_CLASSES.markerUser);},_setXYResetString:function(){this._resetString.setStyle("top",(this._centerButtonNode.get("region").height/2)-(this._resetString.get("region").height/2)+"px");this._resetString.setStyle("left",(this._centerButtonNode.get("region").width/2)-(this._resetString.get("region").width/2)+"px");},_renderCenterButton:function(){var j=this.get("contentBox"),k=j.one("."+h.CSS_CLASSES.centerButton);if(!k){k=f.create(b.substitute(h.CENTER_BUTTON_TEMPLATE,this.get("strings")));j.one("."+h.CSS_CLASSES.ring).append(k);}this._centerButtonNode=k;this._resetString=this._centerButtonNode.one("."+h.CSS_CLASSES.resetString);this._setXYResetString();this._resetString.setContent("");var l=this._ringNode.get("region").width*0.25;this._centerButtonNode.setXY([(this._ringNode.getX()+l),(this._ringNode.getY()+l)]);},_renderHandle:function(){var j=this.get("contentBox"),k=j.one("."+h.CSS_CLASSES.handle);if(!k){k=f.create(b.substitute(h.HANDLE_TEMPLATE,this.get("strings")));j.one("."+h.CSS_CLASSES.ring).append(k);}this._handleNode=k;this._handleUserNode=this._handleNode.one("."+h.CSS_CLASSES.handleUser);},setLabelString:function(j){this.get("contentBox").one("."+h.CSS_CLASSES.labelString).setContent(j);},setResetString:function(j){this.set("strings.resetStr",j);this.get("contentBox").one("."+h.CSS_CLASSES.resetString).setContent(j);this._setXYResetString();this._resetString.setContent("");},setTooltipString:function(j){this.get("contentBox").one("."+h.CSS_CLASSES.handleUser).set("title",j);},_onDirectionKey:function(j){j.preventDefault();switch(j.charCode){case 38:this._incrMinor();break;case 40:this._decrMinor();break;case 36:this._resetDial();break;case 35:this._setToMax();break;case 33:this._incrMajor();break;case 34:this._decrMajor();break;}},_onLeftRightKey:function(j){j.preventDefault();switch(j.charCode){case 37:this._decrMinor();break;case 39:this._incrMinor();break;}},_incrMinor:function(){var j=(this.get("value")+this.get("minorStep"));j=Math.min(j,this.get("max"));this.set("value",j.toFixed(this.get("decimalPlaces"))-0);},_decrMinor:function(){var j=(this.get("value")-this.get("minorStep"));j=Math.max(j,this.get("min"));this.set("value",j.toFixed(this.get("decimalPlaces"))-0);},_incrMajor:function(){var j=(this.get("value")+this.get("majorStep"));j=Math.min(j,this.get("max"));this.set("value",j.toFixed(this.get("decimalPlaces"))-0);},_decrMajor:function(){var j=(this.get("value")-this.get("majorStep"));j=Math.max(j,this.get("min"));this.set("value",j.toFixed(this.get("decimalPlaces"))-0);},_setToMax:function(){this.set("value",this.get("max"));},_setToMin:function(){this.set("value",this.get("min"));},_resetDial:function(){this.set("value",this._originalValue);this._handleUserNode.focus();},_getAngleFromValue:function(j){var k=j%this.get("stepsPerRev");var l=k/this.get("stepsPerRev")*360;return l;},_getValueFromAngle:function(k){if(k<0){k=(360+k);}else{if(k===0){k=360;}}var j=(k/360)*this.get("stepsPerRev");j=(j+(this._timesWrapped*this.get("stepsPerRev")));return j.toFixed(this.get("decimalPlaces"))-0;},_afterValueChange:function(j){this._uiSetValue(j.newVal);},_uiSetValue:function(j){this._angle=this._getAngleFromValue(j);if(this._handleNode.hasClass(h.CSS_CLASSES.dragging)===false){this._setTimesWrapedFromValue(j);this._setNodeToFixedRadius(this._handleNode);this._prevX=this._handleNode.getX();}this._valueStringNode.setContent(j);this._handleUserNode.set("aria-valuenow",j);this._handleUserNode.set("aria-valuetext",j);this._setNodeToFixedRadius(this._markerNode);if((j===this.get("max"))||(j===this.get("min"))){if(this._markerUserNode.hasClass("marker-max-min")===false){this._markerUserNode.addClass("marker-max-min");if(c===true){this._markerUserNode.getElementsByTagName("fill").set("color","#AB3232");}}}else{if(c===true){this._markerUserNode.getElementsByTagName("fill").set("color","#000");}if(this._markerUserNode.hasClass("marker-max-min")===true){this._markerUserNode.removeClass("marker-max-min");}}},_validateValue:function(l){var k=this.get("min"),j=this.get("max");return(e.isNumber(l)&&l>=k&&l<=j);}});b.Dial=h;},"@VERSION@",{requires:["widget","dd-drag","substitute","event-mouseenter","transition","intl"],skinnable:true,lang:["en","es"]});